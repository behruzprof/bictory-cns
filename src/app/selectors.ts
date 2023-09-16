import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "types"
import { initialState } from "./slice"

export const GlobalDomains = {
  root: (state: RootState) => state?.global,
  router: (state: RootState) => state?.router || {},
  loggedIn: (state: RootState) => state?.global?.loggedIn || false,
  isOpenConnectWalletInfo: (state: RootState) =>
    state?.global?.globalModals.isOpenConnectWalletInfo ||
    initialState.globalModals.isOpenConnectWalletInfo,
  isOpenConnectWalletQR: (state: RootState) =>
    state?.global?.globalModals.isOpenConnectWalletQR ||
    initialState.globalModals.isOpenConnectWalletQR,
  isOpenUserWallet: (state: RootState) =>
    state?.global?.globalModals.isOpenUserWallet ||
    initialState.globalModals.isOpenUserWallet,
  isOpenDisconnectWallet: (state: RootState) =>
    state?.global?.globalModals.isOpenDisconnectWallet ||
    initialState.globalModals.isOpenDisconnectWallet,
  isOpenAlert: (state: RootState) =>
    state?.global?.globalModals.isOpenAlert ||
    initialState.globalModals.isOpenAlert,
  isOpenCreateSubdomain: (state: RootState) =>
    state?.global?.globalModals.isOpenCreateSubdomain ||
    initialState.globalModals.isOpenCreateSubdomain,
  isOpenConfirmSubdomain: (state: RootState) =>
    state?.global?.globalModals.isOpenConfirmSubdomain ||
    initialState.globalModals.isOpenConfirmSubdomain,
  isOpenSetRecord: (state: RootState) =>
    state?.global?.globalModals.isOpenSetRecord ||
    initialState.globalModals.isOpenSetRecord,
  qrCodeWalletConnectorData: (state: RootState) =>
    state?.global?.qrCodeWalletConnectorData ||
    initialState.qrCodeWalletConnectorData,
  executeRecaptcha: (state: RootState) =>
    state?.global?.executeRecaptcha || undefined,
  walletInfoData: (state: RootState) =>
    state?.global?.walletInfoData || undefined,
  isLoadingSignIn: (state: RootState) =>
    state?.global?.isLoadingSignIn || initialState.isLoadingSignIn,
  afterWalletConnection: (state: RootState) =>
    state.global?.afterWalletConnection || undefined,
  txHash: (state: RootState) => state.global?.tx_hash || initialState.tx_hash,
  isLoadingUserData: (state: RootState) =>
    state.global?.isLoadingUserData || initialState.isLoadingUserData,
  user: (state: RootState) => state.global?.user || initialState.user,
  dispatch: (state: RootState) => state.global?.dispatch || undefined,
  isOpenSubmittedAlert: (state: RootState) =>
    state.global?.globalModals.isOpenSubmittedAlert ||
    initialState.globalModals.isOpenSubmittedAlert,
  isOpenFailedAlert: (state: RootState) =>
    state.global?.globalModals.isOpenFailedAlert ||
    initialState.globalModals.isOpenFailedAlert,
  isOpenSellAlert: (state: RootState) =>
    state.global?.globalModals.isOpenSellAlert ||
    initialState.globalModals.isOpenSellAlert,
  favoriteDomains: (state: RootState) =>
    state.global?.favoriteDomains || initialState.favoriteDomains,
}

export const GlobalSelectors = {
  router: createSelector(GlobalDomains.router, (state) => state),
  loggedIn: createSelector(GlobalDomains.loggedIn, (isLoggedIn) => isLoggedIn),
  executeRecaptcha: createSelector(GlobalDomains.executeRecaptcha, (e) => e),
  txHash: createSelector(GlobalDomains.txHash, (hash) => hash),
  isOpenConnectWalletInfo: createSelector(
    GlobalDomains.isOpenConnectWalletInfo,
    (isOpen) => isOpen
  ),
  isOpenConnectWalletQR: createSelector(
    GlobalDomains.isOpenConnectWalletQR,
    (isOpen) => isOpen
  ),
  isOpenUserWallet: createSelector(
    GlobalDomains.isOpenUserWallet,
    (isOpen) => isOpen
  ),
  isOpenDisconnectWallet: createSelector(
    GlobalDomains.isOpenDisconnectWallet,
    (isOpen) => isOpen
  ),
  isOpenAlert: createSelector(GlobalDomains.isOpenAlert, (isOpen) => isOpen),
  isOpenCreateSubdomain: createSelector(
    GlobalDomains.isOpenCreateSubdomain,
    (isOpen) => isOpen
  ),
  isOpenConfirmSubdomain: createSelector(
    GlobalDomains.isOpenConfirmSubdomain,
    (isOpen) => isOpen
  ),
  isOpenSetRecord: createSelector(
    GlobalDomains.isOpenSetRecord,
    (isOpen) => isOpen
  ),
  qrCodeWalletConnectorData: createSelector(
    GlobalDomains.qrCodeWalletConnectorData,
    (data) => data
  ),
  walletInfoData: createSelector(GlobalDomains.walletInfoData, (data) => data),
  isLoadingSignIn: createSelector(
    GlobalDomains.isLoadingSignIn,
    (isLoading) => isLoading
  ),
  isLoadingUserData: createSelector(
    GlobalDomains.isLoadingUserData,
    (isLoading) => isLoading
  ),
  user: createSelector(GlobalDomains.user, (userData) => userData),
  isOpenSubmittedAlert: createSelector(
    GlobalDomains.isOpenSubmittedAlert,
    (isOpenSubmitted) => isOpenSubmitted
  ),
  isOpenFailedAlert: createSelector(
    GlobalDomains.isOpenFailedAlert,
    (isOpen) => isOpen
  ),
  isOpenSellAlert: createSelector(
    GlobalDomains.isOpenSellAlert,
    (isOpen) => isOpen
  ),
  favoriteDomains: createSelector(
    GlobalDomains.favoriteDomains,
    (favoriteDomains) => favoriteDomains
  ),
  mismathcedWallets: createSelector(
    [GlobalDomains.user, GlobalDomains.walletInfoData],
    (user, wallet) => {
      if (wallet && user && user?.wallet_address !== wallet[0].address) {
        return true
      }
      return false
    }
  ),
}
