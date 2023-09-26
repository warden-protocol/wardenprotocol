This folder is generated using `buf` and its `es` (EcmaScript) plugin.

Install the required packages:

```
brew install buf

npm install -g @bufbuild/protoc-gen-es
```

Then, from this folder (`web/src/proto`), run:

```
./regen.sh
```

