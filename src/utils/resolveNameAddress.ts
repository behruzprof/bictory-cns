import { toast } from "react-toastify"
import { nameResolverApi } from "services/nameResolver"
import { addTrailingCCD } from "./commonUtils"
/**
 *
 * @param name
 * @returns string
 * this will check if we are passing a name, and resolves the related address in this case, othervise, it will return the entered address
 */
export const resolveNameAddress = async (name: string) => {
  let transferDomainWalletAddress = name
  if (transferDomainWalletAddress?.length !== 50) {
    await nameResolverApi.connect()
    transferDomainWalletAddress = addTrailingCCD(transferDomainWalletAddress)
    const address = await nameResolverApi.resolve(transferDomainWalletAddress)
    if (address) {
      transferDomainWalletAddress = address
    } else {
      toast.error("invalid name")
      throw new Error("name doesn't exist")
    }
  }
  return transferDomainWalletAddress
}
