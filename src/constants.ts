export const OsmosisChainInfo = {
  // Chain-id of the Osmosis chain.
  chainId: "osmo-test-5",
  // The name of the chain to be displayed to the user.
  chainName: "Osmosis Testnet",
  // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
  rpc: "https://rpc.osmotest5.osmosis.zone",
  // REST endpoint of the chain.
  rest: "https://lcd.osmotest5.osmosis.zone",
  // Staking coin information
  stakeCurrency: {
    // Coin denomination to be displayed to the user.
    coinDenom: "OSMO",
    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
    coinMinimalDenom: "uosmo",
    // # of decimal points to convert minimal denomination to user-facing denomination.
    coinDecimals: 6,
    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
    // coinGeckoId: ""
  },
  // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
  // The 'stake' button in Keplr extension will link to the webpage.
  // walletUrlForStaking: "",
  // The BIP44 path.
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  // Bech32 configuration to show the address to user.
  // This field is the interface of
  // {
  //   bech32PrefixAccAddr: string;
  //   bech32PrefixAccPub: string;
  //   bech32PrefixValAddr: string;
  //   bech32PrefixValPub: string;
  //   bech32PrefixConsAddr: string;
  //   bech32PrefixConsPub: string;
  // }
  bech32Config: {
    bech32PrefixAccAddr: "osmo",
    bech32PrefixAccPub: "osmopub",
    bech32PrefixValAddr: "osmovaloper",
    bech32PrefixValPub: "osmovaloperpub",
    bech32PrefixConsAddr: "osmovalcons",
    bech32PrefixConsPub: "osmovalconspub",
  },
  // List of all coin/tokens used in this chain.
  currencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "OSMO",
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: "uosmo",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
    },
  ],
  // List of coin/tokens used as a fee token in this chain.
  feeCurrencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "OSMO",
      // Actual denom (i.e. uosmo, uscrt) used by the blockchain.
      coinMinimalDenom: "uosmo",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
      // (Optional) This is used to set the fee of the transaction.
      // If this field is not provided and suggesting chain is not natively integrated, Keplr extension will set the Keplr default gas price (low: 0.01, average: 0.025, high: 0.04).
      // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
      // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
      gasPriceStep: {
        low: 0.0025,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
}


// export const TestnetDymensionChainInfo = {
//   // Chain-id of the Osmosis chain.
//   chainId: "froopyland_100-1",
//   // The name of the chain to be displayed to the user.
//   chainName: "Dymension Testnet",
//   // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
//   rpc: "https://dym.rpc.cumulo.com.es/",
//   // REST endpoint of the chain.
//   rest: "https://froopyland.blockpi.network/lcd/v1/public",
//   currencies: [
//     {
//       // Coin denomination to be displayed to the user.
//       coinDenom: "dym",
//       // Actual denom (i.e. uatom, uscrt) used by the blockchain.
//       coinMinimalDenom: "udym",
//       // # of decimal points to convert minimal denomination to user-facing denomination.
//       coinDecimals: 18,
//       // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
//       // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
//       // coinGeckoId: ""
//     },
//   ],
// }


export const TestnetDymensionChainInfo = {
  chainId: "froopyland_100-1",
  chainName: "Dymension Testnet",
  chainSymbolImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/froopyland_100/chain.png",
  // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
  rpc: "https://dym.rpc.cumulo.com.es/",
  // REST endpoint of the chain.
  rest: "https://froopyland.blockpi.network/lcd/v1/public",
  currencies: [
    {
      coinMinimalDenom: "udym",
      coinDenom: "DYM",
      coinDecimals: 18,
      coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/froopyland_100/chain.png"
    }
  ],
  bip44: {
    coinType: 60
  },
  bech32Config: {
    bech32PrefixAccAddr: "dym",
    bech32PrefixAccPub: "dympub",
    bech32PrefixValAddr: "dymvaloper",
    bech32PrefixValPub: "dymvaloperpub",
    bech32PrefixConsAddr: "dymvalcons",
    bech32PrefixConsPub: "dymvalconspub"
  },
  stakeCurrency: {
    coinMinimalDenom: "udym",
    coinDenom: "DYM",
    coinDecimals: 18,
    coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/froopyland_100/chain.png"
  },
  feeCurrencies: [
    {
      coinMinimalDenom: "udym",
      coinDenom: "DYM",
      coinDecimals: 18,
      coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/froopyland_100/chain.png",
      gasPriceStep: {
        average: 0.4,
        high: 0.55,
        low: 0.25
      }
    }
  ],
  features: [
    "ibc-go",
    "ibc-transfer",
    "ibc-pfm",
    "query:/cosmos/bank/v1beta1/spendable_balances",
    "eth-address-gen",
    "eth-key-sign"
  ],
  beta: true
}

export const DymensionChainInfo = {
  "chainId": "dymension_1100-1",
  "chainName": "Dymension",
  rpc: "https://dymension.blockpi.network/rpc/v1/public",
  rest: "https://dymension.blockpi.network/lcd/v1/public",

  "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png",
  "currencies": [
    {
      "coinMinimalDenom": "adym",
      "coinDenom": "DYM",
      "coinDecimals": 18,
      "coinGeckoId": "dymension",
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png"
    }
  ],
  "bip44": {
    "coinType": 60
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "dym",
    "bech32PrefixAccPub": "dympub",
    "bech32PrefixValAddr": "dymvaloper",
    "bech32PrefixValPub": "dymvaloperpub",
    "bech32PrefixConsAddr": "dymvalcons",
    "bech32PrefixConsPub": "dymvalconspub"
  },
  "stakeCurrency": {
    "coinMinimalDenom": "adym",
    "coinDenom": "DYM",
    "coinDecimals": 18,
    "coinGeckoId": "dymension",
    "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png"
  },
  "feeCurrencies": [
    {
      "coinMinimalDenom": "adym",
      "coinDenom": "DYM",
      "coinDecimals": 18,
      "coinGeckoId": "dymension",
      "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png",
      "gasPriceStep": {
        "average": 20000000000,
        "high": 20000000000,
        "low": 20000000000
      }
    }
  ],
  "walletUrlForStaking": "https://wallet.keplr.app/chains/dymension",
  "features": [
    "ibc-go",
    "ibc-transfer",
    "ibc-pfm",
    "query:/cosmos/bank/v1beta1/spendable_balances",
    "eth-address-gen",
    "eth-key-sign"
  ],
  "beta": true
}
