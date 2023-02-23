import './style.css';
import { Content, Heading } from 'react-bulma-components';
import logo from '../../assets/logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <Content className='header'>
      <div className='renotion-title-logo'>
        <img src={logo} alt='Renotion' className='renotion-logo' />
        <Heading style={{margin: '0 12px'}} className='renotion-title-text' size={3}>
          <span className='renotion-title-color'>
            Re
          </span>
          notion
        </Heading>
      </div>
      <ConnectButton />
    </Content>
  );
}
