import '@rainbow-me/rainbowkit/styles.css';

import {
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  braveWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY;

const providers = [
  publicProvider()
];
if (ALCHEMY_KEY) {
  providers.unshift(alchemyProvider({ apiKey: ALCHEMY_KEY }));
}

export const { chains, provider } = configureChains(
  [polygon],
  providers
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      braveWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ appName: 'Renotion', chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
    ]
  }
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});