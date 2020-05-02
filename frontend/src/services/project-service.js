import axios from 'axios'
import vars from '../dev-env-variables'

class ProjectService {

  getAllProjects (search, category) {
    return axios.get(vars.baseURI + '/projects',{
      params: {
        name: search,
        category: category
      }
    })
  }

  async getOneProject (projectId) {
    return axios.get(vars.baseURI + '/projects/' + projectId)
  }

  createNewProject (projectData) {
    return axios.post(vars.baseURI + '/projects/new', projectData)
  }

  editProject(projectData){
    return axios.put(vars.baseURI + '/projects/edit', projectData)
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

  deleteProject(projectId){
    return axios.delete(vars.baseURI + '/projects/' + projectId)
  }

}

export default new ProjectService()
