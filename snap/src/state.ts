import type { KeyringState } from './keyring';

const defaultState: KeyringState = {
  accounts: {},
  pendingRequests: {},
};

/**
 * Get the current state.
 * @returns The current state.
 */
export async function getState(): Promise<KeyringState> {
  const state = (await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  })) as any;

  return {
    ...defaultState,
    ...state,
  };
}

/**
 * Save the state.
 * @param state - The state to save.
 */
export async function saveState(state: KeyringState) {
  await snap.request({
    method: 'snap_manageState',
    params: { operation: 'update', newState: state },
  });
}
