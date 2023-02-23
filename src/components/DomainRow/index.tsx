import './style.css';
import { Content, Modal, Tag } from 'react-bulma-components';
import { FaChevronRight } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useState } from 'react';
import DomainDetails from '../DomainDetails';
import Link from '../Link';
import { ownershipStatusInfo, shorten, sslStatusInfo } from '../../utils';
import { Domain, OwnershipStatus, SSLVerificationStatus } from '../../types/domain';

interface DomainRowProps {
  domain: Domain;
}

interface SSLTagProps {
  status: SSLVerificationStatus;
}

const SSLTag = (props: SSLTagProps) => {
  const { color, text } = sslStatusInfo(props.status);
  return (
    <Tag.Group hasAddons style={{marginBottom: 0}}>
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
    <Tag.Group hasAddons style={{marginBottom: 0}}>
      <Tag color={'dark'}>Ownership</Tag>
      <Tag color={color}>{text}</Tag>
    </Tag.Group>
  );
};

export default function DomainRow(props: DomainRowProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Content>
      <div className='domain-info' onClick={() => setShowModal(!showModal)}>
        <div className='domain-info-row'>
          <div className='domain-info-row-content'>
            <div className='domain-info-row-content-inner'>
              <div>
                <Link
                  title={props.domain.hostname}
                  url={`https://${props.domain.hostname}`}
                />
              </div>
            </div>
            <div className='domain-info-row-content-inner'>
              <div>
                <Link
                  title={shorten(props.domain.page, 16)}
                  url={`https://notion.so/${props.domain.page}`}
                />
              </div>
            </div>
            <div className='domain-info-row-content-tags'>
              <OwnershipTag status={props.domain.ownershipStatus} />
              <SSLTag status={props.domain.sslStatus} />
            </div>
          </div>
          {
            (
              props.domain.ownershipStatus !== OwnershipStatus.Active
              || props.domain.sslStatus !== SSLVerificationStatus.Active
            )
            && (
              <div className='domain-info-row-action'>
                <HiOutlineExclamationCircle />
                <span>Action needed</span>
              </div>
            )
          }
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