const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTUAL_INPUT_COIN':
      return {
        ...state, actualInputCoin: action.actualInputCoin
      }
      case 'NEXT_INPUT_COIN':
        return {
          ...state, nextInputCoin: action.nextInputCoin
        }
        case 'ACTUAL_DROPDOWN_CURRENCY':
          return {
            ...state, actualDropdownCurrency: action.actualDropdownCurrency
          }
          case 'NEXT_DROPDOWN_CURRENCY':
            return {
              ...state, actualDropdownCurrency: action.nextDropdownCurrency
            }
            default:
              return state
  }
}