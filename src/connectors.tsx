import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.REACT_APP_RPC_URL_MAINNET as string,
  5: process.env.REACT_APP_RPC_URL_TESTNET as string,
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 5],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 5: RPC_URLS[5] },
  qrcode: true,
});
