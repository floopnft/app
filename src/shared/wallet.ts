import { config } from '@shared/config';
import { Keypair } from '@solana/web3.js';

export const wallet = {
  publicKey: keypairFromSeed(config.wallet.seed).publicKey,
};

function keypairFromSeed(seed: string) {
  const expandedSeed = Uint8Array.from(Buffer.from(`${seed.padEnd(32, '0')}`));
  return Keypair.fromSeed(expandedSeed.slice(0, 32));
}
