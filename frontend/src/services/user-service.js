import axios from 'axios'
import vars from '../dev-env-variables'

class AuthenticationService {

  getUserFromLogin (loginData) {
    return axios.post(vars.baseURI + '/authenticate', loginData)
  }

}

export default new AuthenticationService()
