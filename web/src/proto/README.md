This folder is generated using `buf` and its `es` (EcmaScript) plugin.

Install the required packages:

```
brew install buf

npm install -g @bufbuild/protoc-gen-es
```

Then from the `blockchain/` folder, run:

```
buf generate --template buf.ts.gen.yaml 
```

