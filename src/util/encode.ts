// this is to force the packager to include the generated types
import { Dec, DecUtils } from "@keplr-wallet/unit";
import {PubKey} from "../proto-types-gen/src/cosmos/crypto/ed25519/keys";
import {MsgCreateValidator} from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import {MsgEditValidator} from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import {MsgVote} from "../proto-types-gen/src/cosmos/gov/v1beta1/tx";
import {MsgWithdrawValidatorCommission} from "../proto-types-gen/src/cosmos/distribution/v1beta1/tx";
import {MsgWithdrawDelegatorReward} from "../proto-types-gen/src/cosmos/distribution/v1beta1/tx";
import {MsgSetWithdrawAddress} from "../proto-types-gen/src/cosmos/distribution/v1beta1/tx";

const typeMap: { [key: string]: any } = {
  "/cosmos.crypto.ed25519.PubKey": { msgType: PubKey, fixer: fixPubKey },
  "/cosmos.staking.v1beta1.MsgCreateValidator": { msgType: MsgCreateValidator, fixer: fixMsgCreateValidator },
  "/cosmos.staking.v1beta1.MsgEditValidator": { msgType: MsgEditValidator, fixer: fixMsgEditValidator },
  "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": { msgType: MsgWithdrawValidatorCommission, fixer: null },
  "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": { msgType: MsgWithdrawDelegatorReward, fixer: null },
  "/cosmos.gov.v1.MsgVote": { msgType: MsgVote, fixer: null },
  "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": { msgType: MsgSetWithdrawAddress, fixer: null },
};

function fixPubKey(n:any) {
  const typeUrl = n["@type"];
  delete n["@type"];

  var MsgType = typeMap[typeUrl].msgType;

  const msgDoc = MsgType.fromJSON(n);
  const msgBytes = MsgType.encode(msgDoc).finish();
  const protoMsg = {
    typeUrl: typeUrl,
    value: Buffer.from(msgBytes).toString("base64"),
  }

  return protoMsg;
}

function fixMsgCreateValidator(n:any) {
  const commission = n.commission;
  commission.rate = DecUtils.getTenExponentN(18).mul(new Dec(commission.rate)).truncate().toString();
  commission.maxRate = DecUtils.getTenExponentN(18).mul(new Dec(commission.maxRate)).truncate().toString();
  commission.maxChangeRate = DecUtils.getTenExponentN(18).mul(new Dec(commission.maxChangeRate)).truncate().toString();
  return n;
}

function fixMsgEditValidator(n:any) {
  n.commissionRate = DecUtils.getTenExponentN(18).mul(new Dec(n.commissionRate)).truncate().toString();
  return n;
}

export const encodeMsg = async (o:any) : Promise<any> => {
  const typeUrl = o["@type"];
  var MsgType = typeMap[typeUrl].msgType;

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

    if (typeMap[n['@type']]?.fixer) {
      return typeMap[n['@type']].fixer(n);
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
