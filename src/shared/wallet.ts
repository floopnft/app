import { observable } from '@legendapp/state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppIdentity,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol';
import { Keypair } from '@solana/web3.js';
import base58 from 'bs58';
import * as Device from 'expo-device';
import { nanoid } from 'nanoid';
import { btoa, toByteArray } from 'react-native-quick-base64';

export const STORAGE_WALLET_KEY = 'wallet';

export const APP_IDENTITY: AppIdentity = {
  name: 'Floop',
  uri: 'https://www.floop.art',
  icon: '/icon.png',
};

const authMsg = () => {
  return `Signing this message will authenticate you in Floop

Timestamp: ${new Date()}}
Nonce: ${nanoid()}`;
};

export const connectMWAAndSignMessage = async () => {
  return transact(async (wallet) => {
    const res = await wallet.authorize({
      cluster: 'devnet',
      identity: APP_IDENTITY,
    });
    const acc = res.accounts[0];
    const signedMessage = await wallet.signMessages({
      addresses: [acc.address],
      payloads: [btoa(authMsg())],
    });

    const binAddr = toByteArray(res.accounts[0].address);
    return base58.encode(binAddr);
  });
};

export const generateWallet = () => {
  const keypair = Keypair.generate();
  return keypair;
};

export const isSaga = Device.modelName === 'Saga';

export const $wallet = observable<{ publicKey: string } | null>(null);

export const initWallet = async () => {
  if ($wallet.peek()) {
    return;
  }
  if (isSaga) {
    const publicKey = await connectMWAAndSignMessage();
    $wallet.set({ publicKey });
  } else {
    const publicKey = generateWallet().publicKey.toBase58();
    $wallet.set({ publicKey });
  }

  AsyncStorage.setItem(STORAGE_WALLET_KEY, JSON.stringify($wallet.peek()));
};

export const loadWallet = async () => {
  const walletJson = await AsyncStorage.getItem(STORAGE_WALLET_KEY);
  if (!walletJson) {
    return null;
  }
  const wallet: { publicKey: string } = JSON.parse(walletJson);

  $wallet.set(wallet);

  return wallet;
};

export function shortenWalletAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
