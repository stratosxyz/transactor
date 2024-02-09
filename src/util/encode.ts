// this is to force the packager to include the generated types
import { Dec, DecUtils } from "@keplr-wallet/unit";
import {PubKey} from "../proto-types-gen/src/cosmos/crypto/ed25519/keys";
import {MsgCreateValidator} from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";


const typeMap: { [key: string]: any } = {
  "/cosmos.crypto.ed25519.PubKey": PubKey,
  "/cosmos.staking.v1beta1.MsgCreateValidator": MsgCreateValidator,
};


export const encodeMsg = async (o:any) : Promise<any> => {
  const typeUrl = o["@type"];
  var MsgType = typeMap[typeUrl];

  const encoded = await camelAndEncode(o);
  const msgDoc = MsgType.fromJSON(encoded);
  const msgBytes = MsgType.encode(msgDoc).finish();
  const protoMsg = {
    typeUrl: typeUrl,
    value: msgBytes,
  }

  return protoMsg;
}


const camelAndEncode = async (o:any) : Promise<any> => {
  if (isObject(o)) {
    const n: { [key: string]: any } = {};
    for (const k in o) {
      n[toCamel(k)] = await camelAndEncode(o[k]);
    }

    if (n['@type'] === "/cosmos.crypto.ed25519.PubKey") {
      const typeUrl = n["@type"];
      delete n["@type"];

      var MsgType = typeMap[typeUrl];

      const msgDoc = MsgType.fromJSON(n);
      const msgBytes = MsgType.encode(msgDoc).finish();
      const protoMsg = {
        typeUrl: typeUrl,
        value: Buffer.from(msgBytes).toString("base64"),
      }

      return protoMsg;
    }

    if (n['@type'] === "/cosmos.staking.v1beta1.MsgCreateValidator") {
      const commission = n.commission;
      commission.rate = DecUtils.getTenExponentN(18).mul(new Dec(commission.rate)).truncate().toString();
      commission.maxRate = DecUtils.getTenExponentN(18).mul(new Dec(commission.maxRate)).truncate().toString();
      commission.maxChangeRate = DecUtils.getTenExponentN(18).mul(new Dec(commission.maxChangeRate)).truncate().toString();
      console.log(commission);
    }


    return n;
  } 
  else if (Array.isArray(o)) {
    const n = new Array(o.length);
    for (let i = 0; i < o.length; i++) {
      n[i] = await camelAndEncode(o[i]);
    }
    return n;
  }

  return o;
};

function toCamel(s:string) : string {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

function isObject (value:any) {  
  return Object.prototype.toString.call(value) === '[object Object]'
}
