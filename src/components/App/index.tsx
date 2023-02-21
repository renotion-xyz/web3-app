import './style.css';
import { Content, Container, Section } from 'react-bulma-components';
import { chains, wagmiClient } from '../../web3/wallet';
import { WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import Register from '../Register';
import Pages from '../Pages';
import Header from '../Header';
import { useState } from 'react';


const RAINBOW_THEME = darkTheme({
  fontStack: 'system',
  overlayBlur: 'small'
});

export default function App() {
  const [pagesUpdateTs, setPagesUpdateTs] = useState(0);

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
        <Section>
          <Container style={{maxWidth: '600px'}}>
            <Header />
            <Content>
              <Register setNeedsReloadPages={() => setPagesUpdateTs(Date.now())} />
              <Pages updateTs={pagesUpdateTs} />
            </Content>
          </Container>
        </Section>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
