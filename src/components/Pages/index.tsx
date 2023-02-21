import './style.css';
import { Block, Box, Heading, Notification } from 'react-bulma-components';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { listAllDomains, Domain } from '../../api';
import { InfinitySpin } from 'react-loader-spinner';
import DomainInfo from '../DomainInfo';

interface PagesProps {
  updateTs: number;
}

export default function Pages(props: PagesProps) {
  const { address, status } = useAccount();
  const [domains, setDomains] = useState<Domain[]>();

  useEffect(() => {
    if (!address || status !== 'connected') {
      return;
    }
    listAllDomains(address)
      .then(setDomains);
  }, [address, status, props.updateTs])

  return (
    <Box>
      <Heading size={4}>
        My pages
      </Heading>
      {
        status !== 'connected'
        && (
          <Notification light={true} color={'info'}>
            Connect wallet to load your registered pages
          </Notification>
        )
      }
      {
        status === 'connected'
        && !domains
        && (
          <Block className='loading-indicator'>
            <InfinitySpin
              width='200'
              color="#fff"
            />
          </Block>
        )
      }
      {
        status === 'connected'
        && domains && domains.length === 0
        && (
          <Notification light={true} color={'info'}>
            You don't have any pages registered
          </Notification>
        )
      }
      {
        status === 'connected'
        && domains && domains.length > 0
        && (
          domains.map((domain, idx) => (
            <DomainInfo domain={domain} key={`d-${domain.hostname}-${idx}`} />
          ))
        )
      }
    </Box>
  );
}
