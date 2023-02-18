import './style.css';
import { Block, Box, Button, Form, Heading } from 'react-bulma-components';
import { useEffect, useState } from 'react';
import { useProvider, useSigner } from 'wagmi';
import { getMinPrice, registerPage } from '../../web3/renotion';
import { pageIdFromUrl } from '../../utils';
import { ethers, ContractTransaction } from 'ethers';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

async function register(domain: string, pageUrl: string, price: string, signer: ethers.Signer): Promise<ContractTransaction> {
  const page = pageIdFromUrl(pageUrl);
  const tx = await registerPage(page, domain, price, signer);
  return tx;
}

export default function Register () {
  const [domain, setDomain] = useState('');
  const [page, setPage] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const provider = useProvider();
  const { data: signer } = useSigner();
  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    getMinPrice(provider)
      .then(setMinPrice);
  }, [provider]);

  function tryRegister() {
    if (!signer) {
      return;
    }

    register(domain, page, minPrice, signer)
      .then((tx) => {
        addRecentTransaction({
          hash: tx.hash!,
          description: 'Page registration'
        });
        // TODO: set disabled and loading
        return tx.wait();
      })
      .then(() => {
        // TODO: set enabled cleared and not loading
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
            value={domain}
            placeholder={'ethereum.org'}
            onChange={(e) => {
              return setDomain(e.target.value);
            }}
          />
        </Form.Control>
        {/* <Form.Help color="success">This username is available</Form.Help> */}
      </Form.Field>
      <Form.Field>
        <Form.Label>Notion Page URL</Form.Label>
        <Form.Control>
          <Form.Input
            value={page}
            placeholder={'https://example.notion.site/Hello-abc1337def'}
            onChange={(e) => {
              return setPage(e.target.value);
            }}
          />
        </Form.Control>
        <Form.Help>Page should be publicly shared</Form.Help>
      </Form.Field>
      <Block className='register-button-price-container'>
        <Button color={'primary'} onClick={() => tryRegister()}>
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
