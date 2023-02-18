import './style.css';
import { Content, Modal, Tag } from 'react-bulma-components';
import { Domain, SSLVerificationStatus, OwnershipStatus } from '../../api';
import { FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import DomainDetails from '../DomainDetails';
import Link from '../Link';
import { ownershipStatusInfo, sslStatusInfo } from '../../utils';

interface DomainInfoProps {
  domain: Domain;
}

interface SSLTagProps {
  status: SSLVerificationStatus;
}

const SSLTag = (props: SSLTagProps) => {
  const { color, text } = sslStatusInfo(props.status);
  return (
    <Tag.Group hasAddons>
      <Tag color={'dark'}>TLS</Tag>
      <Tag color={color}>{text}</Tag>
    </Tag.Group>
  );
};

interface OwnershipTagProps {
  status: OwnershipStatus;
}

const OwnershipTag = (props: OwnershipTagProps) => {
  const { color, text } = ownershipStatusInfo(props.status);
  return (
    <Tag.Group hasAddons>
      <Tag color={'dark'}>Ownership</Tag>
      <Tag color={color}>{text}</Tag>
    </Tag.Group>
  );
};

export default function DomainInfo(props: DomainInfoProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Content>
      <div className='domain-info' onClick={() => setShowModal(!showModal)}>
        <div className='domain-info-row'>
          <div className='domain-info-row-content'>
            <div>
              <Link
                title={props.domain.hostname}
                url={`https://${props.domain.hostname}`}
              />
            </div>
            <OwnershipTag status={props.domain.ownershipStatus} />
          </div>
          <div className='domain-info-row-content'>
            <div>
              <Link
                title={props.domain.page}
                url={`https://notion.so/${props.domain.page}`}
              />
            </div>
            <SSLTag status={props.domain.sslStatus} />
          </div>
        </div>
        <div>
          <FaChevronRight color='rgba(128, 128, 128, 0.5)' />
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        closeOnEsc={true}
        closeOnBlur={true}
      >
        <Modal.Content>
          <DomainDetails domain={props.domain} />
        </Modal.Content>
      </Modal>
    </Content>
  );
}