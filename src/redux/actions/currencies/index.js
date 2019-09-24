import {
  getCurrenciesAction
} from "../actionsCreators";
import {
  api
} from '../../../services';


export default function () {
  return dispatch => {
    api.coin().then(props => {
      if (props.status) return dispatch(getCurrenciesAction(props.data))
    })
  }
}