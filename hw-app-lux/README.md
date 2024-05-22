[Github](https://github.com/LedgerHQ/ledgerjs/),
[Ledger Devs Slack](https://ledger-dev.slack.com/)

## @luxfi/hw-app-lux

[Ledger Hardware Wallet](https://www.ledger.com/) JavaScript bindings for [Lux](https://lux.network/), based on [LedgerJS](https://github.com/LedgerHQ/ledgerjs).

## Using LedgerJS for Lux

Here is a sample app for Node:

```javascript
const Transport = require("@ledgerhq/hw-transport-node-hid").default;
const Lux = require("@luxfi/hw-app-lux").default;

const getWalletId = async () => {
  const lux = new Lux(await Transport.create());
  return await lux.getWalletId();
};

const signHash = async () => {
  const transport = await Transport.create();
  const lux = new Lux(await Transport.create());
  return await lux.signHash(
    "44'/9000'/0'/0/0",
    "0000000000000000000000000000000000000000000000000000000000000000"
  );
};

const getVersion = async () => {
  const lux = new Lux(await Transport.create());
  return await lux.getAppConfiguration();
};

const getAddress = async () => {
  const lux = new Lux(await Transport.create());
  return await lux.getWalletPublicKey("44'/9000'/0'/1/0");
};

const doAll = async () => {
  console.log(await getWalletId());
  console.log(await getVersion());
  console.log(await getAddress());
  console.log(await signHash());
};

doAll().catch(err => console.log(err));
```

## API

#### Table of Contents

-   [Lux](#lux)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
    -   [getWalletPublicKey](#getwalletpublickey)
        -   [Parameters](#parameters-1)
        -   [Examples](#examples-1)
    -   [signTransaction](#signtransaction)
        -   [Parameters](#parameters-2)
        -   [Examples](#examples-2)
    -   [getAppConfiguration](#getappconfiguration)
        -   [Examples](#examples-3)
    -   [getWalletId](#getwalletid)
        -   [Examples](#examples-4)

### Lux

Lux API for Ledger

#### Parameters

-   `transport` **`Transport<any>`**
-   `scrambleKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `"Lux"`)

#### Examples

```javascript
import Lux from "@luxfi/hw-app-lux";
const lux = new Lux(transport);
```

#### getWalletPublicKey

Get Lux address for a given BIP-32 path.

##### Parameters

-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a path in BIP-32 format

##### Examples

```javascript
const publicKey = await lux.getWalletPublicKey("44'/9000'/0'/0/0");
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** an object with a public key.

#### signHash

Sign a 32-byte hash of transaction with a given BIP-32 path

##### Parameters

-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a path in BIP-32 format
-   `hash` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** hash of a to sign

##### Examples

```javascript
const signature = await lux.signHash("44'/9000'/0'/0/0", "0000000000000000000000000000000000000000000000000000000000000000");
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** a signature as hex string.

#### getAppConfiguration

Get the version of the application installed on the hardware device.

##### Examples

```javascript
console.log(await lux.getAppConfiguration());
```

produces something like

```
{
  "version": "1.0.3",
  "commit": "1234567",
  "name": "Avax"
}
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;{version: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), commit: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), name: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}>** an object with a version.

#### getWalletId

Get the wallet identifier for the Ledger wallet. This value distinguishes different Ledger hardware devices which have different seeds.

##### Examples

```javascript
console.log(await lux.getWalletId());
```
produces something like

```
abcdefgh
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** a byte string.
