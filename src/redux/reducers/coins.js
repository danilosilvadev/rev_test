import {
  REQUEST_COIN,
  REQUEST_WALLET,
  UPDATE_WALLET
} from '../actionTypes/index';

const req = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_COIN:
      return {
        ...state, currencies: action.payload
      }
      case REQUEST_WALLET:
        return {
          ...state, wallet: action.payload
        }
        case UPDATE_WALLET:
          return {
            ...state, wallet: action.payload
          }
          default:
            return state
  }
}

export default req