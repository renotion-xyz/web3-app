import './style.css';
import { Block, Box, Content, Heading, Tag, Notification, Table } from 'react-bulma-components';
import Link from '../Link';
import { cnameFromHostname, ownershipStatusInfo, sslStatusInfo } from '../../utils';
import ClickToCopy from '../ClickToCopy';
import { Domain, OwnershipStatus, SSLVerificationStatus } from '../../types/domain';

interface DomainDetailsProps {
  domain: Domain;
}

export default function DomainDetails(props: DomainDetailsProps) {
  const sslStatus = sslStatusInfo(props.domain.sslStatus);
  const ownershipStatus = ownershipStatusInfo(props.domain.ownershipStatus);

  return (
    <Box>
      <Content>
        <Heading size={4}>{props.domain.hostname}</Heading>
        <Block>
          Notion page: &nbsp;
          <Link
            title={props.domain.page}
            url={`https://notion.so/${props.domain.page}`}
          />
        </Block>
        <Block>
          <Heading size={5}>
            Ownership &nbsp; <Tag color={ownershipStatus.color}>{ownershipStatus.text}</Tag>
          </Heading>
          {
            props.domain.ownershipStatus === OwnershipStatus.Active
            ? (
              <Notification light={true} color={'success'}>
                Ownership verification is complete
              </Notification>
            )
            : (
              <Block>
                <p>Please update DNS Records:</p>
                <Table className='dns-records-table'>
                  <tbody>
                    <tr>
                      <td><b>Type</b></td>
                      <td>CNAME</td>
                    </tr>
                    <tr>
                      <td><b>Name</b></td>
                      <td><ClickToCopy text={cnameFromHostname(props.domain.hostname)}/></td>
                    </tr>
                    <tr>
                      <td><b>Value</b></td>
                      <td><ClickToCopy text='abc.renotion.xyz'/></td>
                    </tr>
                  </tbody>
                </Table>
              </Block>
            )
          }
        </Block>
        <Block>
          <Heading size={5}>
            TLS &nbsp; <Tag color={sslStatus.color}>{sslStatus.text}</Tag>
          </Heading>
          {
            props.domain.sslStatus === SSLVerificationStatus.Active
            ? (
              <Notification light={true} color={'success'}>
                TLS validation is complete
              </Notification>
            )
            : (
              props.domain.txtRecordDetails
              ? (
                <Block>
                  <p>Please update DNS Records:</p>
                  <Table className='dns-records-table'>
                    <tbody>
                      <tr>
                        <td><b>Type</b></td>
                        <td>TXT</td>
                      </tr>
                      <tr>
                        <td><b>Name</b></td>
                        <td><ClickToCopy text={props.domain.txtRecordDetails.name}/></td>
                      </tr>
                      <tr>
                        <td><b>Value</b></td>
                        <td><ClickToCopy text={props.domain.txtRecordDetails.value}/></td>
                      </tr>
                    </tbody>
                  </Table>
                </Block>
              )
              : (
                <Notification light={true} color={'warning'}>
                  TLS is initializing...
                </Notification>
              )
            )
          }
        </Block>
      </Content>
    </Box>
  );
}
