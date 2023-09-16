import { BictoryCnsApi, Environment } from "@bictory/cns-resolver"
import { IS_PRODUCTION } from "./constants"

export const nameResolverApi = new BictoryCnsApi(
  IS_PRODUCTION ? Environment.MAINNET : Environment.TESTNET
)
