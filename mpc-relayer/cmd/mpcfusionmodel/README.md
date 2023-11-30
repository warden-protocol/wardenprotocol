# MPC Fusion model

This is a mini server that mocks the responses of the `mpcclientparent` service, used by the `mpc-relayer` to obtain key and signature data. It can be used to model (and test) interaction between the `mpc-relayer` and `mpcclientparent`.


## Getting started

```
$ go run .
```

### Running with Docker 

```
$ cd ../docker
$ ./docker-build-mpcfusionmodel.sh
$ docker run -it -p 9000:9000 mpcfusionmodel
```

## APIs

## ECDSA Key request
```
$curl \
    -H "Content-Type: application/json" \
    -d '{"key_id": "0000000000000000000000000000000000000000000000000000000000000002", "key_ring":"mpcfusionmodel"}' \
      localhost:9000/ecdsa/keys
$ {"service":"mpcclientparent","message":"OK","version":"0.0.1","key_id":"0000000000000000000000000000000000000000000000000000000000000002","trace_id":"5ec180a4fc6d78fe2a172cb75efebb3a","ecdsa_pk":"037229663af76233b617be8d3c2aca3152bd5ce725b22dd5ed808bfdbcffc3fe93","eddsa_pk_32":"","currency":0,"namespace":"","node":""}
```

## ECDSA Sign requests

### Server chosen message (key verification)
```
$ curl \
    -H "Content-Type: application/json" \
    -d '{ "is_key": 1, "key_id": "0000000000000000000000000000000000000000000000000000000000000002", "key_ring":"mpcfusionmodel", "ecdsa_message":"000000000000000000000000000000000000000000000000000000000000000a"}' \
      localhost:9000/ecdsa/sign
$ {"service":"mpcclientparent","message":"OK","version":"1.0.0","trace_id":"fc1ee0d30e64ddd6238ca2602fc3b3ab","is_key":1,"key_id":"0000000000000000000000000000000000000000000000000000000000000002","id":"","ecdsa_message":"000000000000000000000000000000000000000000000000000000000000000a","ecdsa_r":"c1d0e628c8d8fe2a0c8fef6d1586e19954aa024981e57150f0b260f497eb8747","ecdsa_s":"623f9afa585be1e8abbd7a6312f88a4ca8c329a41bad281ce148a12340f7595e","ecdsa_pk":"037229663af76233b617be8d3c2aca3152bd5ce725b22dd5ed808bfdbcffc3fe93","eddsa_message":"","eddsa_r_32":"","eddsa_s_32":"","eddsa_pk_32":"","namespace":"","node":""}

```

### User chosen message
```
$ curl \
    -H "Content-Type: application/json" \
    -d '{"is_key": 0, "key_id": "0000000000000000000000000000000000000000000000000000000000000002", "id": "000000000000000000000000000000000000000000000000000000000000000a", "key_ring":"mpcfusionmodel", "ecdsa_message":"000000000000000000000000000000000000000000000000000000000000000a"}' \
      localhost:9000/ecdsa/sign
$ {"service":"mpcclientparent","message":"OK","version":"1.0.0","trace_id":"","is_key":0,"key_id":"0000000000000000000000000000000000000000000000000000000000000002","id":"000000000000000000000000000000000000000000000000000000000000000a","ecdsa_message":"000000000000000000000000000000000000000000000000000000000000000a","ecdsa_r":"6e058a56939f35bb9247f8ea0ebe535a47ba7231dcbd567c4d415cf257f77391","ecdsa_s":"7ca6f6f55e111904255b9c81c28d7ebe478679b34f76edb6893d0357c7bb397d","ecdsa_pk":"037229663af76233b617be8d3c2aca3152bd5ce725b22dd5ed808bfdbcffc3fe93","eddsa_message":"","eddsa_r_32":"","eddsa_s_32":"","eddsa_pk_32":"","namespace":"","node":""}

```


## EdDSA Key request
```
$ curl \
    -H "Content-Type: application/json" \
    -d '{"key_id": "0000000000000000000000000000000000000000000000000000000000000003", "key_ring":"mpcfusionmodel"}' \
      localhost:9000/eddsa/keys
$ {"service":"mpcclientparent","message":"OK","version":"0.0.1","key_id":"0000000000000000000000000000000000000000000000000000000000000003","trace_id":"5823d0fe7a4e0ad85dde12e6b8a5061f","ecdsa_pk":"","eddsa_pk_32":"b22bf05670a605ba5aa59ba0d57c938183a8f7ddaebaee27b1772d02c7442bed","currency":0,"namespace":"","node":""}
```


## EdDSA Sign requests

### Server chosen message (key verification)
```
$ curl \
    -H "Content-Type: application/json" \
    -d '{"is_key": 1, "key_id": "0000000000000000000000000000000000000000000000000000000000000003", "id": "000000000000000000000000000000000000000000000000000000000000000a", "key_ring":"mpcfusionmodel", "eddsa_message":"000000000000000000000000000000000000000000000000000000000000000a"}' \
      localhost:9000/eddsa/sign
$ {"service":"mpcclientparent","message":"OK","version":"1.0.0","trace_id":"fc304ef079575739789e5bbc700b179f","is_key":1,"key_id":"0000000000000000000000000000000000000000000000000000000000000003","id":"000000000000000000000000000000000000000000000000000000000000000a","ecdsa_message":"","ecdsa_r":"","ecdsa_s":"","ecdsa_pk":"","eddsa_message":"000000000000000000000000000000000000000000000000000000000000000a","eddsa_r_32":"3383ba73f4997388f5c3dab24c43255bb0ec136b1680bc09ba029068e5875205","eddsa_s_32":"a6d612247581d959f6303dab75ad5902a415daf58604d597428a2a8c4b7daa0f","eddsa_pk_32":"b22bf05670a605ba5aa59ba0d57c938183a8f7ddaebaee27b1772d02c7442bed","namespace":"","node":""}

```

### User chosen message
```
$ curl \
    -H "Content-Type: application/json" \
    -d '{"is_key": 0, "key_id": "0000000000000000000000000000000000000000000000000000000000000003", "id": "000000000000000000000000000000000000000000000000000000000000000a", "key_ring":"mpcfusionmodel", "eddsa_message":"000000000000000000000000000000000000000000000000000000000000000a"}' \
      localhost:9000/eddsa/sign
$ {"service":"mpcclientparent","message":"OK","version":"1.0.0","trace_id":"2904ae83c21188619933cb3c3cc55d3e","is_key":0,"key_id":"0000000000000000000000000000000000000000000000000000000000000003","id":"000000000000000000000000000000000000000000000000000000000000000a","ecdsa_message":"","ecdsa_r":"","ecdsa_s":"","ecdsa_pk":"","eddsa_message":"000000000000000000000000000000000000000000000000000000000000000a","eddsa_r_32":"130d639f2027d0ecb52e8649764b15583c29c31b78a17ef9f2fa0601e28be760","eddsa_s_32":"f5ed8ea8f49bb5e846ecfdf6fc08d4718a823fd8b4db34c1b4e3680da26cc905","eddsa_pk_32":"b22bf05670a605ba5aa59ba0d57c938183a8f7ddaebaee27b1772d02c7442bed","namespace":"","node":""}

```

