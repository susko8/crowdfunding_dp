import axios from 'axios'
import vars from '../dev-env-variables'

class CoinPriceService {

  getEtherPrice () {
    return axios.get(vars.baseURI+'/price')
  }

}

export default new CoinPriceService()
