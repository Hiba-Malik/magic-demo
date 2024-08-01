import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

export const magic = new Magic(PUBLIC_KEY, {
  network: {
    rpcUrl:
    "https://rpc-amoy.polygon.technology/",
    chainId: 80002,
  },
  extensions: [new OAuthExtension()],
});