import Contracts from './contracts'

class CrowdfundingContract {
  init (store) {
    Contracts.initializeContracts()
    this.store = store
  }

  async getNumberProjects () {
    const crowdfundingContract = await this.initCrowdfundingContract()
    return await crowdfundingContract.getNumberProjects({from: this.store.state.web3.coinbase})
  }

  async getActualProjectStatus (projectId) {
    const crowdfundingContract = await this.initCrowdfundingContract()
    return await crowdfundingContract.getActualProjectStatus(projectId, {from: this.store.state.web3.coinbase})
  }

  async addNewProject (projectId,targetSum) {
    const crowdfundingContract = await this.initCrowdfundingContract()
    return await crowdfundingContract.addNewProject(projectId,targetSum, {from: this.store.state.web3.coinbase})
  }

  async initCrowdfundingContract () {
    return await Contracts.getCrowdfundingContract()
  }
}

export default CrowdfundingContract
