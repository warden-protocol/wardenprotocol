import { delay, logError } from '@warden-automated-orders/utils';

export abstract class Processor<T> {
  constructor(private generator: () => AsyncGenerator<T, unknown, unknown>) {}

  async start(): Promise<void> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        for await (const request of this.generator()) {
          await this.handle(request);
        }
      } catch (error) {
        logError(error);

        await delay(5_000);
      }
    }
  }

  abstract handle(data: T): Promise<void>;
}
