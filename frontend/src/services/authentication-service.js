import axios from 'axios'
import vars from '../dev-env-variables'

class AuthenticationService {

  login (loginData) {
    return axios.post(vars.baseURI + '/authenticate', loginData)
  }

  setToken(jwt, user){
    localStorage.setItem('jwtToken', jwt)
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  logout () {
    localStorage.clear();
    location.reload()
  }

}

export default new AuthenticationService()
