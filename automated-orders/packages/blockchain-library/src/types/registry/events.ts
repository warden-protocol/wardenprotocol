import { EventLog } from 'web3';

export interface OrderCreated extends EventLog {
  type: 'OrderCreated';
  returnValues: {
    creator: string;
    order: string;
  };
}
