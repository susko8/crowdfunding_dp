import axios from 'axios'
import vars from '../dev-env-variables'

class ProjectService {

  getAllProjects () {
    return axios.get(vars.baseURI + '/projects')
  }

  async getOneProject (projectId) {
    return axios.get(vars.baseURI + '/projects/' + projectId)
  }

  createNewProject (projectData) {
    return axios.post(vars.baseURI + '/projects/new', projectData)
  }

  recordContribution (projectId, contributionData) {
    return axios.post(vars.baseURI + '/projects/contribute/' + projectId, contributionData)
  }

  getAllContributions () {
    return axios.get(vars.baseURI + '/projects/contributions')
  }

  getContributionsForProject (projectId) {
    return axios.get(vars.baseURI + '/projects/contributions/' + projectId)
  }

}

export default new ProjectService()
