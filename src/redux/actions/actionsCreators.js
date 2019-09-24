import {
  REQUEST_COIN,
  REQUEST_WALLET
} from '../actionTypes'

export const getCurrenciesAction = coins => ({
  type: REQUEST_COIN,
  payload: coins,
})

export const getWalletAction = wallet => ({
  type: REQUEST_WALLET,
  payload: wallet,
})

export const updateWalletAction = (walletUpdate) => ({
  type: REQUEST_WALLET,
  payload: walletUpdate,
})