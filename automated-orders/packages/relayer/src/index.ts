import { logError, logInfo } from '@warden-automated-orders/utils';

async function main() {
  logInfo('todo: implementation');
}

main()
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .finally(() => process.exit());
