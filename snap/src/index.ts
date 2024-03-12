import { handleKeyringRequest } from '@metamask/keyring-api';
import type {
  Json,
  OnKeyringRequestHandler,
  OnRpcRequestHandler,
} from '@metamask/snaps-sdk';

import { WardenKeyring } from './keyring';
import { getState } from './state';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin: _origin,
  request,
}) => {
  switch (request.method) {
    default:
      throw new Error('Method not found.');
  }
};

let _keyring: WardenKeyring;

/**
 * Returns the keyring singleton instance, or initializes it if it doesn't exist.
 * @returns The keyring singleton instance.
 */
async function getKeyring(): Promise<WardenKeyring> {
  if (_keyring) {
    return _keyring;
  }

  const state = await getState();
  if (_keyring) {
    // check again if _keyring has been initialized while we were awaiting getState()
    return _keyring;
  }

  _keyring = new WardenKeyring(state);
  return _keyring;
}

export const onKeyringRequest: OnKeyringRequestHandler = async ({
  origin: _origin,
  request,
}) => {
  const keyring = await getKeyring();
  return handleKeyringRequest(keyring, request).then((response) => {
    if (!response) {
      return {} as Json;
    }
    return response;
  });
};
