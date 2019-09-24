import {
  getWalletAction,
  updateWalletAction
} from "../actionsCreators";

export const getWallet = () => dispatch => {
  const prom = new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve({
        EUR: 9.07,
        GBP: 8.01,
        USD: 10.00
      })
      reject((err) => {
        console.error(err)
      })
    }, 1000);
  })

  prom.then((props) => {
    dispatch(getWalletAction(props))
  })
}

export const updateWallet =
  (props) => dispatch => dispatch(updateWalletAction(props))