import { delay, logError } from '@warden-automated-orders/utils';

export abstract class Processor<T> {
  constructor(private generator: () => AsyncGenerator<T, unknown, unknown>) {}

  async start(): Promise<void> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        for await (const request of this.generator()) {
          let result = false;

          while (result !== true) {
            result = await this.handle(request);

            if (!result) {
              await delay(1_000);
            }
          }
        }
      } catch (error) {
        logError(error);

        await delay(5_000);
      }
    }
  }

  abstract handle(data: T): Promise<boolean>;
}
