
# Ethereum Sample Clause

This is a smart legal clause conforms that to the [Accord Protocol Template Specification](https://docs.google.com/document/d/1UacA_r2KGcBA2D4voDgGE8jqid-Uh4Dt09AE-shBKR0), the protocol is managed by the open-source community of the [Accord Project](https://accordproject.org). The clause can be parsed and executed by the [Cicero](https://github.com/accordproject/cicero) engine and is designed to run on the [Clause platform](https://clause.io)

## Description

> Sample that invokes an arbitrary Ethereum contract on the Rinkby Ethereum Test Net, signing the transaction with a private key. *Note* that this sample *only* works with the Rinkby Test Net and hardcodes the private key for the source account into the contract. This is clearly not sufficient for a real business transaction, but has been provided to allow you to start experimenting with using Ethereum for smart legal contracts. We plan to extend and improve this functionality in the near future.

You are encouraged to copy this sample when building your own Smart Clause that needs to invoke and Ethereum contract.

## Creating an Account and Getting the Private Key

To use this template you need an Ethereum account on the Rinky Test Net, the private key for the account, have some Ether in the source account, and have the address of a destination account.

### Create Account

Install a local `geth` node. E.g. by following: https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac

Launch the local `geth` node (connecting to the Rinkeby test network) in a terminal using:

```
geth --rinkeby --rpc --verbosity 2 console
```

You may need to wait for the node to synchronize with the network.

Then create your test account by using the `geth` REPL:

```
personal.newAccount()
eth.coinbase
```

### Transfer Ether into Account

You will then have to request some Ether for your account using the faucet service at https://faucet.rinkeby.io by passing a URL to a Tweet containing the Ethereum address you created above.

You will also need to grab a random destination Ethereum account. You can use https://rinkeby.etherscan.io to check the status of your account or to find the address of a random destination Ethereum account you can use for testing.

### Getting your Private Key

Your private key is stored (encrypted using the passphrase you used when you created your account) on local disk in a JSON keystore (wallet) file. The easiest way to extract the plain text private key is to use the MyEtherWallet service which allows you to upload the JSON file, unlock it using your passphrase and then displays the plain text private key.

On Mac OS X the JSON keystore files for your accounts are stored under `~/Library/Ethereum/rinkeby/keystore/` using a generated file name.

1. Visit https://www.myetherwallet.com
2. Press the "View Wallet Info" menu option
3. Press the Keystore / JSON File radio button
4. Press the "Select Wallet File" and browse to your JSON keystore file
5. Enter your account passphrase to unlock your wallet
6. Press the eye icon next to the "Private Key (unencrypted)" field
7. Copy the plain text private key
8. Use your source account address and your private key in your smart clause.

## Sample Payload Data

Request, as in [data.json](https://github.com/accordproject/cicero-template-library/blob/master/integration-ethereumcontract/data.json)
```json
{
    "$class": "io.clause.samples.integration.ethereumcontract.Request"
}
```
> We don't need to pass in any data, as it is all stored in the contract. We simply need to trigger the execution.

For the request above, you should see the following response:
```json
{
    "$class":"io.clause.outbound.physical.dlt.ethereum.NonInteractiveEthereumTransaction",
    "fromAccount":"0xd6a33a691c19169a9e8121d12cfc602fa29f3663",
    "privateKey":"0x6afe5c024ae7c41983edc026f2122e0b24d934b1982b9d9d552fbb224286bfdc",
    "contractAddress":"0xBe85EbE9fee3646177fc94Ffb97DdBcd8B465552",
    "contractInterface":"[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"balances\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]",
    "data":"0xa9059cbb000000000000000000000000d6a33a691c19169a9e8121d12cfc602fa29f36630000000000000000000000000000000000000000000000000000000000000064",
    "gasLimit":200000,
    "transactionId":"580f4e96-fcdf-491e-a856-a7f26440afa6",
    "timestamp":"2018-03-07T15:52:56.253Z"
}
```
The values in the response are from the [clause text](sample.txt). When executing this clause on the [Clause platform](https://clause.io), this response is automatically understood and the platform will make the Ethereum transfer.

You can check the transfer using https://rinkeby.etherscan.io by entering the account or contract address.

### Finding the `contractInterface` and `data` values for your contract

We need the ABI (Application Binary Interface) of your Ethereum contract to be able to submit a transaction to it. You can find the JSON representation of your contract by entering your Solidity source code into the [Remix tool](http://remix.ethereum.org/).

1. From Remix choose the `Compile` tab.
2. Click the `Details` button.
3. Clicking the copy icon next to the `ABI` entry will copy the JSON representation to your clipboard.
4. Don't forget to *stringify* the JSON before using it in your contract template or logic.

Remix will also let you test your Solidity code locally in your browser. This allows you to build a static data payload for your transaction to use in your Cicero contract.

1. From the `Run` tab, *deploy* your contract by clicking `Create`. You'll need to provide sensible values for your constructor.
2. Each of your functions are available for simulation at the bottom of the right-hand panel. Simulate a transaction by clicking the button with the name of your transaction.
3. For the last entry in the log window click `Details`.
4. Use the value shown in the `input` row as the value for `data` in your Cicero request.

