/**
 * Custom error for missing required clients
 */
export class MissingClientError extends Error {
    constructor(message = 'At least one of EvmClient or BiconomyMEEClient must be provided') {
      super(message);
      this.name = 'MissingClientError';
      Object.setPrototypeOf(this, MissingClientError.prototype);
    }
  }