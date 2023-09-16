import { apiService } from "services/api_service"
import { RequestTypes } from "services/constants"
import { GetPriceType } from "utils/cryptoXconvertors"

export const getPrice = (data: GetPriceType) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/get_price`,
    requestType: RequestTypes.GET,
  })
}
