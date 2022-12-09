const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')


const logger = {
  warn: msg => console.error(`WARN: ${msg}`),
  err: msg => console.error(`ERR: ${msg}`),
  info: msg => console.log(`INFO: ${msg}`)
}

function panic(errMsg) {
  logger.err(errMsg);
  process.exit(-1);
}

function checkTestEnv() {
  
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 [options] <tests>')
    .example('$0 --network ethermint', 'run all tests using ethermint network')
    .example('$0 --network ethermint --allowTests=test1,test2', 'run only test1 and test2 using ethermint network')
    .help('h').alias('h', 'help')
    .describe('network', 'set which network to use: ganache|ethermint')
    .describe('batch', 'set the test batch in parallelized testing. Format: %d-%d')
    .describe('allowTests', 'only run specified tests. Separated by comma.')
    .boolean('verbose-log').describe('verbose-log', 'print ethermintd output, default false')
    .argv;

  if (!fs.existsSync(path.join(__dirname, './node_modules'))) {
    panic('node_modules not existed. Please run `yarn install` before running tests.');
  }
  const runConfig = {};
  
  // Check test network
  if (!argv.network) {
    runConfig.network = 'ganache';
  }
  else {
    if (argv.network !== 'ethermint' && argv.network !== 'ganache') {
      panic('network is invalid. Must be ganache or ethermint');
    }
    else {
      runConfig.network = argv.network;
    }
  }

  if (argv.batch) {

    const [toRunBatch, allBatches] = argv.batch.split('-').map(e => Number(e));

    console.log([toRunBatch, allBatches]);
    if (!toRunBatch || !allBatches) {
      panic('bad batch input format');
    }
    
    if (toRunBatch > allBatches) {
      panic('test batch number is larger than batch counts');
    }
    
    if (toRunBatch <= 0 || allBatches <=0 ) {
      panic('test batch number or batch counts must be non-zero values');
    }
    
    runConfig.batch = {};
    runConfig.batch.this = toRunBatch;
    runConfig.batch.all = allBatches;

  }

  // only test
  runConfig.onlyTest = !!argv['allowTests'] ? argv['allowTests'].split(',') : undefined;
  runConfig.verboseLog = !!argv['verbose-log'];

  logger.info(`Running on network: ${runConfig.network}`);
  return runConfig;

}

function loadTests(runConfig) {
  let validTests = [];
  fs.readdirSync(path.join(__dirname, 'suites')).forEach(dirname => {
    const dirStat = fs.statSync(path.join(__dirname, 'suites', dirname));
    if (!dirStat.isDirectory) {
      logger.warn(`${dirname} is not a directory. Skip this test suite.`);
      return;
    }

    const needFiles = ['package.json', 'test'];
    for (const f of needFiles) {
      if (!fs.existsSync(path.join(__dirname, 'suites', dirname, f))) {
        logger.warn(`${dirname} does not contains file/dir: ${f}. Skip this test suite.`);
        return;
      }
    }

    // test package.json
    try {
      const testManifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'suites', dirname, 'package.json'), 'utf-8'))
      const needScripts = ['test-ganache', 'test-ethermint'];
      for (const s of needScripts) {
        if (Object.keys(testManifest['scripts']).indexOf(s) === -1) {
          logger.warn(`${dirname} does not have test script: \`${s}\`. Skip this test suite.`);
          return;
        }
      }
    } catch (error) {
      logger.warn(`${dirname} test package.json load failed. Skip this test suite.`);
      logger.err(error);
      return;
    }
    validTests.push(dirname);
  })

  if (runConfig.onlyTest) {
    validTests = validTests.filter(t => runConfig.onlyTest.indexOf(t) !== -1);
  }

  if (runConfig.batch) {
    const chunkSize = Math.ceil(validTests.length / runConfig.batch.all);
    const toRunTests = validTests.slice(
      (runConfig.batch.this - 1) * chunkSize,
      runConfig.batch.this === runConfig.batch.all ? undefined : runConfig.batch.this * chunkSize
    );
    return toRunTests;
  }
  else {
    return validTests;
  }
}

function performTestSuite({ testName, network }) {
  const cmd = network === 'ganache' ? 'test-ganache' : 'test-ethermint';
  return new Promise((resolve, reject) => {
    const testProc = spawn('yarn', [cmd], {
      cwd: path.join(__dirname, 'suites', testName)
    });
  
    testProc.stdout.pipe(process.stdout);
    testProc.stderr.pipe(process.stderr);
  
    testProc.on('close', code => {
      if (code === 0) {
        console.log("end");
        resolve();
      }
      else {
        reject(new Error(`Test: ${testName} exited with error code ${code}`));
      }
    });
  });
}

async function performTests({ allTests, runConfig }) {

  if (allTests.length === 0) {
    panic('No tests are found or all invalid!');
  }

  for (const currentTestName of allTests) {
    logger.info(`Start test: ${currentTestName}`);
    await performTestSuite({ testName: currentTestName, network: runConfig.network });
  }

  logger.info(`${allTests.length} test suites passed!`);
}

function setupNetwork({ runConfig, timeout }) {
  if (runConfig.network !== 'ethermint') {
    // no need to start ganache. Truffle will start it
    return;
  }

  // Spawn the ethermint process

  const spawnPromise = new Promise((resolve, reject) => {
    const ethermintdProc = spawn('./init-test-node.sh', {
      cwd: __dirname,
      stdio: ['ignore', runConfig.verboseLog ? 'pipe' : 'ignore', 'pipe'],
    });

    logger.info(`Starting Ethermintd process... timeout: ${timeout}ms`);
    if (runConfig.verboseLog) {
      ethermintdProc.stdout.pipe(process.stdout);
    }
    ethermintdProc.stderr.on('data', d => {
      const oLine = d.toString();
      if (runConfig.verboseLog) {
        process.stdout.write(oLine);
      }
      if (oLine.indexOf('Starting JSON-RPC server') !== -1) {
        logger.info('Ethermintd started');
        resolve(ethermintdProc);
      }
    });
  });

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Start ethermintd timeout!')), timeout);
  });
  return Promise.race([spawnPromise, timeoutPromise]);
}

async function main() {

  const runConfig = checkTestEnv();
  const allTests = loadTests(runConfig);

  console.log(`Running Tests: ${allTests.join()}`);

  const proc = await setupNetwork({ runConfig, timeout: 50000 });
  await performTests({ allTests, runConfig });

  if (proc) {
    proc.kill();
  }
  process.exit(0);
}

// Add handler to exit the program when UnhandledPromiseRejection

process.on('unhandledRejection', e => {
  console.error(e);
  process.exit(-1);
});

main();