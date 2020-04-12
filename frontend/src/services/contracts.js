'use strict'

const contract = require('truffle-contract')
const CrowdfundingContract = require('../../../build/contracts/Crowdfunding.json')


/**
 * Helper class providing hooks to truffle-contract.
 * Mostly useful as a mean to avoid hard coded dependencies to truffle-contract
 * in various services.
 */
class Contracts {
  static initializeContracts () {
    console.log('initializing contracts')
    const web3js = window.web3
    this.web3provider = web3js.currentProvider
    this.crowdfundingContract = contract(CrowdfundingContract)
    this.crowdfundingContract.setProvider(this.web3provider)
  }

  static async getCrowdfundingContract() {
    return this.crowdfundingContract.deployed()
  }
}

export default Contracts
