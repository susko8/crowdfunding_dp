import axios from 'axios'
import vars from '../dev-env-variables'

class AuthenticationService {

  register (registerData) {
    return axios.post(vars.baseURI + '/users/register', registerData)
  }

}

export default new AuthenticationService()
