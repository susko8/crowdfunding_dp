import axios from 'axios'
import vars from '../dev-env-variables'

class ProjectService {

  getAllProjects () {
    return axios.get(vars.baseURI + '/projects')
  }

  async getOneProject (projectId) {
    return axios.get(vars.baseURI + '/projects/' + projectId)
  }

  createNewProject(projectData){
    return axios.post(vars.baseURI + '/projects/new', projectData)
  }

}

export default new ProjectService()
