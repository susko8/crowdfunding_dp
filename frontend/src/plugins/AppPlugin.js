import CrowdfundingContract from '../services/crowdfunding-contract'

export default {
  install: function (Vue, options) {

    const Crowdfunding = new CrowdfundingContract();
    Crowdfunding.init(options.store)
    Vue.prototype.$blockchain = Crowdfunding
  }
}
