import {
  REQUEST_COIN,
  REQUEST_WALLET
} from '../actionTypes/index';

const req = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_COIN:
      return {
        ...state, currencies: action.payload
      }
      case REQUEST_WALLET:
        console.log(action.payload)
        return {
          ...state, wallet: action.payload
        }
        default:
          return state
  }
}

export default req