import type {
  Keyring,
  KeyringAccount,
  KeyringRequest,
  KeyringResponse,
} from '@metamask/keyring-api';
import { emitSnapKeyringEvent, KeyringEvent } from '@metamask/keyring-api';
import type { Json } from '@metamask/snaps-sdk';
import { v4 as uuidv4 } from 'uuid';

import { saveState } from './state';

export type KeyringState = {
  accounts: Record<string, KeyringAccount>;
  pendingRequests: Record<string, KeyringRequest>;
};

export class WardenKeyring implements Keyring {
  state: KeyringState;

  constructor(state: KeyringState) {
    this.state = state;
  }

  async listAccounts(): Promise<KeyringAccount[]> {
    return Object.values(this.state.accounts);
  }

  async getAccount(id: string): Promise<KeyringAccount | undefined> {
    return this.state.accounts[id];
  }

  async createAccount(
    options?: Record<string, Json> | undefined,
  ): Promise<KeyringAccount> {
    const id = uuidv4();
    const account: KeyringAccount = {
      type: 'eip155:eoa',
      id,
      address: options?.address?.valueOf() as string,
      options: options ?? {},
      methods: ['personal_sign', 'eth_signTransaction', 'eth_signTypedData_v4'],
    };
    this.state.accounts[id] = account;
    await emitSnapKeyringEvent(snap, KeyringEvent.AccountCreated, { account });
    await this.saveState();
    return account;
  }

  async filterAccountChains(_id: string, _chains: string[]): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async updateAccount(_account: KeyringAccount): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteAccount(id: string): Promise<void> {
    delete this.state.accounts[id];
    for (const req of Object.values(this.state.pendingRequests)) {
      if (req.account === id) {
        delete this.state.pendingRequests[req.id];
      }
    }
    return this.saveState();
  }

  async submitRequest(request: KeyringRequest): Promise<KeyringResponse> {
    const account = this.state.accounts[request.account];
    if (!account) {
      throw new Error(`Account ${request.account} not found`);
    }

    this.state.pendingRequests[request.id] = request;
    await this.saveState();

    const url = account.options.url?.toString() ?? 'http://localhost:5173/';

    return {
      pending: true,
      redirect: {
        message: 'Proceed in SpaceWard to approve this request',
        url,
      },
    };
  }

  async saveState() {
    await saveState(this.state);
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return Object.values(this.state.pendingRequests);
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    const req = this.state.pendingRequests[id];
    if (!req) {
      throw new Error(`Request '${id}' not found`);
    }
    return req;
  }

  async approveRequest(id: string, data?: Record<string, Json>): Promise<void> {
    const request = this.state.pendingRequests[id];
    if (!request) {
      throw new Error(`Request ${id} not found`);
    }

    const result = data?.result;
    if (!result) {
      throw new Error(
        '`data.result` is missing. Clients need to populate that field with the result for the request.',
      );
    }

    await emitSnapKeyringEvent(snap, KeyringEvent.RequestApproved, {
      id,
      result,
    });
    delete this.state.pendingRequests[id];
    await this.saveState();
  }

  async rejectRequest(id: string): Promise<void> {
    const request = this.state.pendingRequests[id];
    if (!request) {
      throw new Error(`Request ${id} not found`);
    }

    await emitSnapKeyringEvent(snap, KeyringEvent.RequestRejected, { id });
    delete this.state.pendingRequests[id];
    await this.saveState();
  }
}
