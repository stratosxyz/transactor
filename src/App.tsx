import React, {useEffect} from 'react';
import {getKeplrFromWindow} from "./util/getKeplrFromWindow";
import {TestnetDymensionChainInfo, DymensionChainInfo} from "./constants";
import {Balances} from "./types/balance";
import {Dec, DecUtils} from "@keplr-wallet/unit";
import {sendMsgs} from "./util/sendMsgs";
import {api} from "./util/api";
import {simulateMsgs} from "./util/simulateMsgs";
import {MsgSend} from "./proto-types-gen/src/cosmos/bank/v1beta1/tx";
import {MsgCreateValidator} from "./proto-types-gen/src/cosmos/staking/v1beta1/tx";

import "./styles/container.css";
import "./styles/button.css";
import "./styles/item.css";

function App() {
  const [address, setAddress] = React.useState<string>('');
  const [balance, setBalance] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [gasLimit, setGasLimit] = React.useState<string>('');

  const [recipient, setRecipient] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');

  var chainInfo = DymensionChainInfo;
  chainInfo.chainId = "1"

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const keplr = await getKeplrFromWindow();
    console.log('keplr: ', keplr);
    if(keplr) {
      try {
        // const chains = await keplr.getChainInfosWithoutEndpoints();
        // const ci = chains.find((chain) => chain.chainId === DymensionChainInfo.chainId);
        // console.log('chainInfo: ', ci);
        await keplr.enable(chainInfo.chainId);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  }

  const getKeyFromKeplr = async () => {
    const key = await window.keplr?.getKey(chainInfo.chainId);
    console.log('key: ', key);
    if (key) {
      setAddress(key.bech32Address)
    }
  }

  const getBalance = async () => {
    const key = await window.keplr?.getKey(chainInfo.chainId);

    if (key) {
      const uri = `${chainInfo.rest}/cosmos/bank/v1beta1/balances/${key.bech32Address}?pagination.limit=1000`;
      
      const data = await api<Balances>(uri);
      const currency = chainInfo.currencies[0];
      const balance = data.balances.find((balance) => balance.denom === currency.coinMinimalDenom);
      const decimals = currency?.coinDecimals;

      if(balance) {
        const amount = new Dec(balance.amount, decimals);
        setBalance(`${amount.toString(decimals)} ${currency.coinDenom}`)
      } else {
        setBalance(`0 ${currency.coinDenom}`)
      }
    }
  }

  const sendMessage = async () => {
    if (window.keplr) {
      const msg = JSON.parse(message);
      const typeUrl = msg["@type"];
      delete msg["@type"];

      const typeParts = typeUrl.split('.');
      const msgTypeName = typeParts.pop();
      const MsgType = (await import("./proto-types-gen/src" + typeParts.join('/') + "/tx"))[msgTypeName];

      const msgBytes = MsgType.encode(MsgType.fromJSON(msg)).finish();

      const key = await window.keplr.getKey(chainInfo.chainId);
      const protoMsgs = {
        typeUrl: typeUrl,
        value: msgBytes,
      }

      try {
        await sendMsgs(
          window.keplr,
          chainInfo,
          key.bech32Address,
          [protoMsgs],
          {
            amount: [{
              denom: chainInfo.currencies[0].coinMinimalDenom,
              amount: "236",
            }],
            gas: gasLimit,
          })
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }

    }
}

  const sendBalance = async () => {
    if (window.keplr) {
      const key = await window.keplr.getKey(chainInfo.chainId);
      const protoMsgs = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.encode({
          fromAddress: key.bech32Address,
          toAddress: recipient,
          amount: [
            {
              denom: chainInfo.currencies[0].coinMinimalDenom,
              amount: DecUtils.getTenExponentN(chainInfo.currencies[0].coinDecimals).mul(new Dec(amount)).truncate().toString(),
            },
          ],
        }).finish(),
      }

      try {
        const gasUsed = await simulateMsgs(
          chainInfo,
          key.bech32Address,
          [protoMsgs],
          [{
            denom: chainInfo.currencies[0].coinMinimalDenom,
            amount: "236",
          }]
          );

        if(gasUsed) {
          await sendMsgs(
            window.keplr,
            chainInfo,
            key.bech32Address,
            [protoMsgs],
            {
              amount: [{
                denom: chainInfo.currencies[0].coinMinimalDenom,
                amount: "236",
              }],
              gas: Math.floor(gasUsed * 1.5).toString(),
            })
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }

    }
  }


  return (
    <div className="root-container">
        <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px"
        }}>
          <img src="/keplr-logo.png" style={{maxWidth: "200px"}} alt="keplr-logo" />
        </div>

      <div className="item-container">
        <div className="item">
          <div className="item-title">
            Get {chainInfo.chainName} Address
          </div>

          <div className="item-content">
            <div>
              Address: {address}
            </div>

            <div>
              <button className="keplr-button" onClick={getKeyFromKeplr}>Get Address</button>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="item-title">
            Get {chainInfo.chainName} Balance
          </div>

          <div className="item-content">
            Balance: {balance}

            <button className="keplr-button" onClick={getBalance}>Get Balance</button>
          </div>
        </div>

        <div className="item">
          <div className="item-title">
            Send {chainInfo.currencies[0].coinDenom}
          </div>

          <div className="item-content">
            <div style={{ display: "flex", flexDirection: "column" }}>
              Recipient:
              <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              Amount:
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <button className="keplr-button" onClick={sendBalance}>Send</button>
          </div>

        </div>

        <div className="item">
          <div className="item-title">
            Send Message
          </div>

          <div className="item-content">
            <div style={{ display: "flex", flexDirection: "column" }}>
              Gas limit:
              <input type="text" value={gasLimit} onChange={(e) => setGasLimit(e.target.value)} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              Message:
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>

            <button className="keplr-button" onClick={sendMessage}>Send</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
