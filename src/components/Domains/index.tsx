import './style.css';
import { PropsWithChildren, useState } from 'react';
import { Block, Box, Button, Heading, Modal } from 'react-bulma-components';
import { useAccount } from 'wagmi';
import { InfinitySpin } from 'react-loader-spinner';
import { MdRefresh } from 'react-icons/md';
import DomainRow from '../DomainRow';
import { useDomains } from '../../contexts/domains';
import Register from '../Register';
import connectIcon from '../../assets/connect-icon.svg';

function Notification(props: PropsWithChildren) {
  return (
    <div className='pages-notification'>
      {props.children}
    </div>
  );
}

export default function Domains() {
  const { address, status } = useAccount();
  const { domains, setNeedsReloadDomains } = useDomains();
  const [showModal, setShowModal] = useState(false);

  function onRefresh() {
    if (!address) {
      return;
    }

    setNeedsReloadDomains(address);
  }

  return (
    <Box>
      <Heading size={4} renderAs='div'>
        <div className='pages-header'>
          <div>
            <span>My pages</span>
            {
              status === 'connected'
              && address
              && (
                <button className='pages-refresh-button' onClick={onRefresh}>
                  <MdRefresh size='1.5em' />
                </button>
              )
            }
          </div>
          {
            status === 'connected'
            && address
            && (
              <Button
                size='small'
                onClick={() => setShowModal(true)}
                className='primary-button'
              >
                Register
              </Button>
            )
          }
        </div>
      </Heading>
      {
        status !== 'connected'
        && (
          <Notification>
            <img src={connectIcon} width='45' height='45' />
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
              color='#fff'
            />
          </Block>
        )
      }
      {
        status === 'connected'
        && domains && domains.length === 0
        && (
          <Notification>
            You don't have any pages registered
          </Notification>
        )
      }
      {
        status === 'connected'
        && domains && domains.length > 0
        && (
          domains.map((domain, idx) => (
            <DomainRow domain={domain} key={`d-${domain.hostname}-${idx}`} />
          ))
        )
      }
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        closeOnEsc={true}
        closeOnBlur={true}
      >
        <Modal.Content>
          <Register onFinished={() => setShowModal(false)} />
        </Modal.Content>
      </Modal>
    </Box>
  );
}
