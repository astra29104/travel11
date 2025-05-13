
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import App from './App.tsx';
import './index.css';

const wallets = [
  new PetraWallet()
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <App />
      </AptosWalletAdapterProvider>
    </BrowserRouter>
  </StrictMode>
);
