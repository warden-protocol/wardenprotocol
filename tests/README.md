# Integration tests

This Go module is the "puppeteer" for our integration tests. It can build
`wardend` and the other parts of our system, execute them, and run some tests.

We use the Go built-in testing framework to write our test cases, under the
`cases/` folder.

## Run tests

To run all the tests:

```bash
just test
```

To list and run only one specific test case:

```bash
# list all cases
just list

# run only one case, CreateSpace
just focus CreateSpace
```

## Snapshots

To bootstrap test cases, snapshots for the chain state are available under the
`testdata/` folder. They allow the test cases to be set up quickly with some
pre-determined accounts, Spaces, Keychains, etc.

It's important to be able to regenerate snapshots when needed. All the recipes
for snapshot must be included in the `justfile`.
