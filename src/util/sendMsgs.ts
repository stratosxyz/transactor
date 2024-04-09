import {BroadcastMode, ChainInfo, Keplr, StdFee} from "@keplr-wallet/types";
import {AccountResponse} from "../types/account";
import {api} from "./api";
import {AuthInfo, Fee, TxBody, TxRaw} from "../proto-types-gen/src/cosmos/tx/v1beta1/tx";
import {SignMode} from "../proto-types-gen/src/cosmos/tx/signing/v1beta1/signing";
import {PubKey} from "../proto-types-gen/src/cosmos/crypto/secp256k1/keys";
import {Any} from "../proto-types-gen/src/google/protobuf/any";
import Long from "long";
import {Buffer} from "buffer";
import {TendermintTxTracer} from "@keplr-wallet/cosmos";

export const sendMsgs = async (
  keplr:Keplr,
  chainInfo: ChainInfo,
  sender: string,
  proto: Any[],
  fee: StdFee,
  memo: string = ""
) => {
  const account = await fetchAccountInfo(chainInfo, sender);
  const key = await keplr.getKey(chainInfo.chainId);

  if(account) {
    let signerTypeUrl = "/cosmos.crypto.secp256k1.PubKey";
    if (key.algo === "ethsecp256k1") {
      signerTypeUrl = "/ethermint.crypto.v1.ethsecp256k1.PubKey";
    }

    const signDoc = {
      bodyBytes: TxBody.encode(
        TxBody.fromPartial({
          messages: proto,
          memo,
        })
      ).finish(),
      authInfoBytes: AuthInfo.encode({
        signerInfos: [
          {
            publicKey: {
              typeUrl: signerTypeUrl,
              // When using Fordefi:
              // typeUrl: "/cosmos.crypto.secp256k1.PubKey",
              // When using Keplr:
              // typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
              value: PubKey.encode({
                key: key.pubKey,
              }).finish(),
            },
            modeInfo: {
              single: {
                mode: SignMode.SIGN_MODE_DIRECT,
              },
              multi: undefined,
            },
            sequence: account.sequence,
          },
        ],
        fee: Fee.fromPartial({
          amount: fee.amount.map((coin) => {
            return {
              denom: coin.denom,
              amount: coin.amount.toString(),
            };
          }),
          gasLimit: fee.gas,
        }),
      }).finish(),
      chainId: chainInfo.chainId,
      accountNumber: Long.fromString(account.account_number)
    }

    const signed = await keplr.signDirect(
      chainInfo.chainId,
      sender,
      signDoc,
    )
    
    const signedTx = {
      tx: TxRaw.encode({
        bodyBytes: signed.signed.bodyBytes,
        authInfoBytes: signed.signed.authInfoBytes,
        signatures: [Buffer.from(signed.signature.signature, "base64")],
      }).finish(),
      signDoc: signed.signed,
    }

    const txHash = await keplr.sendTx(chainInfo.chainId, signedTx.tx, "sync" as BroadcastMode);
    const hash = Array.prototype.map.call(txHash, x => ('00' + x.toString(16)).slice(-2)).join('');
    console.log("Transaction hash: ", hash);

    const txTracer = new TendermintTxTracer(chainInfo.rpc, "/websocket");
    txTracer.traceTx(txHash).then((tx) => {
      alert("Transaction commit successfully");
    });

    return hash.toUpperCase();
  }
}

export const fetchAccountInfo = async (chainInfo: ChainInfo, address: string) => {
  try {
    const uri = `${chainInfo.rest}/cosmos/auth/v1beta1/accounts/${address}`;
    const response = await api<AccountResponse>(uri);

    return response.account;
  } catch (e) {
    console.error("This may be a new account. Please send some tokens to this account first.")
    return undefined;
  }
}

