import './style.css';
import { Block, Box, Button, Form, Heading } from 'react-bulma-components';
import { useEffect, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { getMinPrice, registerPage } from '../../web3/renotion';
import { pageIdFromUrl } from '../../utils';
import { ethers, ContractTransaction } from 'ethers';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useDomains } from '../../contexts/domains';

async function register(domain: string, pageUrl: string, price: string, signer: ethers.Signer): Promise<ContractTransaction> {
  const page = pageIdFromUrl(pageUrl);
  const tx = await registerPage(page, domain, price, signer);
  return tx;
}

const DOMAIN_REGEX = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
const PAGE_REGEX = /^https:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\/[\w-]+(?:\w{32})$/;

interface ValidatedInput {
  value: string;
  color?: string;
  help?: string;
  isValid: boolean;
}

interface RegisterProps {
  onFinished: () => void;
}

export default function Register (props: RegisterProps) {
  const [domain, setDomain] = useState<ValidatedInput>({
    value: '',
    isValid: false
  });
  const [page, setPage] = useState<ValidatedInput>({
    value: '',
    help: 'Page should be publicly shared',
    isValid: false
  });
  const [minPrice, setMinPrice] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { setNeedsReloadDomains } = useDomains();

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    getMinPrice(provider)
      .then(setMinPrice);
  }, [provider]);

  function tryRegister() {
    if (!signer || !address) {
      alert('Wallet is not connected');
      return;
    }
    if (!domain.isValid) {
      alert('Domain is not valid');
      return;
    }
    if (!page.isValid) {
      alert('Page is not valid');
      return;
    }

    setIsProcessing(true);

    register(domain.value, page.value, minPrice, signer)
      .then((tx) => {
        addRecentTransaction({
          hash: tx.hash!,
          description: 'Page registration',
          confirmations: 2
        });
        return tx.wait(2);
      })
      .then(() => {
        setPage({ value: '', isValid: false });
        setDomain({ value: '', isValid: false });
        setIsProcessing(false);
        setNeedsReloadDomains(address);
        props.onFinished();
      })
      .catch((err) => {
        if (err.code !== 4001) { // rejected
          alert(err.reason.replace(/execution reverted:/i, '').trim());
        }
        setIsProcessing(false);
      })
  }

  function onChangeDomain(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.toLowerCase();

    let color: string | undefined = undefined;
    let help: string | undefined = undefined;
    let isValid = false;
    if (value.length > 0) {
      if (value.match(DOMAIN_REGEX)) {
        color = 'success';
        isValid = true;
      } else {
        color = 'danger';
        help = 'Please enter a valid domain name, e.g. abc.example.com'
      }
    }

    setDomain({
      value,
      color,
      help,
      isValid
    });
  }

  function onChangePage(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.toLowerCase();

    let color: string | undefined = undefined;
    let help: string | undefined = undefined;
    let isValid = false;
    if (value.length > 0) {
      if (value.match(PAGE_REGEX)) {
        color = 'success';
        isValid = true;
      } else {
        color = 'danger';
        help = 'Please copy and page full Notion page link'
      }
    } else {
      help = 'Page should be publicly shared';
    }

    setPage({
      value,
      color,
      help,
      isValid
    });
  }

  return (
    <Box>
      <Heading size={4}>
        Register page
      </Heading>
      <Form.Field>
        <Form.Label>Domain</Form.Label>
        <Form.Control>
          <Form.Input
            color={domain.color}
            value={domain.value ?? ''}
            placeholder={'ethereum.org'}
            onChange={onChangeDomain}
            disabled={isProcessing}
          />
        </Form.Control>
        {
          domain.help
          && (
            <Form.Help
              color={domain.color}
            >
              {domain.help}
            </Form.Help>
          )
        }
      </Form.Field>
      <Form.Field>
        <Form.Label>Notion Page URL</Form.Label>
        <Form.Control>
          <Form.Input
            color={page.color}
            value={page.value ?? ''}
            placeholder={'https://example.notion.site/Hello-abc1337def'}
            onChange={onChangePage}
            disabled={isProcessing}
          />
        </Form.Control>
        {
          page.help
          && (
            <Form.Help
              color={page.color}
            >
              {page.help}
            </Form.Help>
          )
        }
      </Form.Field>
      <Block className='register-button-price-container'>
        <Button
          color={'primary'}
          onClick={() => tryRegister()}
          disabled={!(domain.isValid && page.isValid) || isProcessing}
          loading={isProcessing}
          rounded={true}
        >
          <b>Register</b>
        </Button>
        {
          minPrice.length > 0
          && (
            <span className='register-price'>
              {minPrice} MATIC + gas fees
            </span>
          )
        }
      </Block>
    </Box>
  );
}
