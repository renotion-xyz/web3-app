import './style.css';
import { Content, Container, Section } from 'react-bulma-components';
import { chains, wagmiClient } from '../../web3/wallet';
import { WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import Domains from '../Domains';
import Header from '../Header';
import { DomainsProvider } from '../../contexts/domains';

const RAINBOW_THEME = darkTheme({
  fontStack: 'system',
  overlayBlur: 'small',
  borderRadius: 'large',
});

RAINBOW_THEME.radii.connectButton = '32px';

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={RAINBOW_THEME}
        chains={chains}
        initialChain={polygon}
        showRecentTransactions={true}
        appInfo={{
          appName: 'Renotion',
        }}
      >
        <DomainsProvider>
          <Section>
            <Container style={{maxWidth: '600px'}}>
              <Header />
              <Content>
                <Domains />
              </Content>
            </Container>
          </Section>
        </DomainsProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
