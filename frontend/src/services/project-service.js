import axios from 'axios'
import vars from '../dev-env-variables'

class ProjectService {

  getAllProjects () {
    return axios.get(vars.baseURI + '/projects')
  }

}

export default new ProjectService()
