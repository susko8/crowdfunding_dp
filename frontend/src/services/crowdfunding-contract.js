import Contracts from './contracts'

class CrowdfundingContract {
  init (store) {
     Contracts.initializeContracts()
     this.store = store
  }

  async getProjects(){
    const crowdfundingContract = await this.initCrowdfundingContract();
    let result = await crowdfundingContract.getNumberProjects({from: this.store.state.web3.coinbase});
    console.log(result.toFixed());
    return result;
  }

  async initCrowdfundingContract () {
     return await Contracts.getCrowdfundingContract()
  }
}

export default CrowdfundingContract
