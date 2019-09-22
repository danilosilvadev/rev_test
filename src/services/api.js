import axios from 'axios'
import {
  formatCoins
} from './middlewares';

axios.defaults.baseURL = 'https://openexchangerates.org/api/'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const appID = '16c8b41c2a92459da3d2cc6ea5d6dbcc'

const is200 = status => !!(status === 200)

const api = {
  coin: () =>
    axios
    .get(`/latest.json?app_id=${appID}`)
    .then(props => {
      return {
        data: formatCoins(props.data),
        status: is200(props.status),
      }
    })
    .catch((err) => {
      console.error(err)
      return false
    }),
}

export default api