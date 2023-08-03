import './style.css';
import { WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { Content, Container, Section } from 'react-bulma-components';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { chains, wagmiConfig } from '../../web3/wallet';
import Domains from '../Domains';
import Header from '../Header';
import { DomainsProvider } from '../../contexts/domains';
import Showcase from '../Showcase';
import Intro from '../Intro';
import Info from '../Contact';
import { References } from '../References';

const RAINBOW_THEME = darkTheme({
  fontStack: 'system',
  overlayBlur: 'small',
  borderRadius: 'large',
  accentColor: '#8449F6'
});

RAINBOW_THEME.radii.connectButton = '10px';

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
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
                <Intro />
                <Domains />
                <Showcase />
                <Info />
                <References />
              </Content>
            </Container>
          </Section>
        </DomainsProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
