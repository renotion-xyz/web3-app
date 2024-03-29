import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_KEY;
const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID;

export const { chains, publicClient } = configureChains(
  [polygon],
  [
    publicProvider(),
    alchemyProvider({ apiKey: ALCHEMY_KEY })
  ]
);

const { connectors } = getDefaultWallets({
  chains,
  appName: 'Renotion',
  projectId: WC_PROJECT_ID,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});