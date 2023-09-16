import { apiService } from "services/api_service"
import { RequestTypes } from "services/constants"
import {
  SerializeDomainType,
  SerializeExtendDomainType,
  SerializePlaceBidType,
  SerializeSetAddressType,
  SerializeSetDataType,
  SerializeSubdomainType,
  SerializeTransferDomainType,
} from "utils/cryptoXconvertors"

export const serializeDomainData = (data: SerializeDomainType) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/serialize_domain`,
    requestType: RequestTypes.POST,
  })
}

export const serializeSubdomainData = (data: SerializeSubdomainType) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/serialize_subdomain`,
    requestType: RequestTypes.POST,
  })
}

export const serializeTransferDomainData = (
  data: SerializeTransferDomainType
) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/serialize_transfer`,
    requestType: RequestTypes.POST,
  })
}

export const serializeExtendDomainData = (data: SerializeExtendDomainType) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/serialize_extend`,
    requestType: RequestTypes.POST,
  })
}

export const serializePlaceBidData = (data: SerializePlaceBidType) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/serialize_bid`,
    requestType: RequestTypes.POST,
  })
}

export const serializeSetDataData = (data: SerializeSetDataType) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/serialize_set_data`,
    requestType: RequestTypes.POST,
  })
}

export const serializeSetAddressData = (data: SerializeSetAddressType) => {
  return apiService.fetchData({
    data,
    url: `smartcontract/serialize_set_address`,
    requestType: RequestTypes.POST,
  })
}
