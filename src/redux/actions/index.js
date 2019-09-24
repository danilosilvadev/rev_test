import currencies from './currencies'
import {
  updateWallet,
  getWallet
} from './wallet'

const reqs = {
  currencies,
  wallet: {
    updateWallet,
    getWallet
  }
}

export {
  reqs
}