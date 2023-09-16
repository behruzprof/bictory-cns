import { apiService } from "services/api_service"
import { RequestTypes } from "services/constants"

export const getActualContractIndexAPI = (name: string) => {
  return apiService.fetchData({
    data: { name },
    url: `smartcontract/get_actual_contract_index`,
    requestType: RequestTypes.GET,
  })
}
