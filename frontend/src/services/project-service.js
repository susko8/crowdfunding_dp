import axios from 'axios'
import vars from '../dev-env-variables'

class ProjectService {

  getAllProjects () {
    return axios.get(vars.baseURI + '/projects')
  }

  getOneProject (projectId) {
    return axios.get(vars.baseURI + '/projects/' + projectId)
  }

}

export default new ProjectService()
