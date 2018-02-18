
# Ethereum Sample Clause

This is a smart legal clause conforms that to the [Accord Protocol Template Specification](https://docs.google.com/document/d/1UacA_r2KGcBA2D4voDgGE8jqid-Uh4Dt09AE-shBKR0), the protocol is managed by the open-source community of the [Accord Project](https://accordproject.org). The clause can be parsed and executed by the [Cicero](https://github.com/accordproject/cicero) engine and is designed to run on the [Clause platform](https://clause.io)

## Description

> Transfers Ether (in Wei) between two accounts, signing the transaction with a private key.

You are encouraged to copy this sample when building your own Smart Clause that needs to make an Ethereum transfer.

Instuctions for setting up your local environment and creating an Ethereum testnet account are available [here](https://github.com/dselman/ethereum-utils)

## Sample Payload Data

Request, as in [data.json](https://github.com/accordproject/cicero-template-library/blob/master/acceptance-of-delivery/data.json)
```json
{
    "$class": "io.clause.samples.integration.ethereum.Request"
}
```
> We don't need to pass in any data, as it is all stored in the contract. We simply need to trigger the execution.

For the request above, you should see the following response:
```json
{
    "$class":"io.clause.outbound.physical.payments.crypto.ethereum.EthereumTransfer",
    "fromAccount":"0xd6a33a691c19169a9e8121d12cfc602fa29f3663",
    "toAccount":"0xf8ebf925868f897c1afc1d2ae5444f3e74677a05",
    "weiValue":2,
    "gasLimit":200000,
    "privateKey":"0x6afe5c024ae7c41983edc026f2122e0b24d934b1982b9d9d552fbb224286bfdc",
    "transactionId":"345b64e5-0c7c-4e3d-a852-ceb9c41abea5",
    "timestamp":"2018-02-18T13:46:04.195Z"
}
```
The values in the response from the [clause text](sample.txt). When executing this clause on the [Clause platform](https://clause.io), this response is automatically understood and the platform will make Ethereum transfer.
