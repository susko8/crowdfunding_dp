const Crowdfunding = artifacts.require('./Crowdfunding.sol')
const assert = require('assert')

contract('Crowdfunding', function () {
  beforeEach(async () => {
    contractInstance = await Crowdfunding.deployed()
  })

  it('Test deployment of migrated projects', async () => {
    await contractInstance.getNumberProjects().then(res =>
      assert.equal(6, res))
  })

  it('Test deployment of new project', async () => {
    await contractInstance.addNewProject(7, 20)
    await contractInstance.getNumberProjects().then(res =>
      assert.equal(7, res))
  })

  it('Test initial sum of project 1', async () => {
    await contractInstance.getActualSumOfProject(1).then(res =>
      assert.equal(0, res)
    )
  })

  it('Test initial sum of project 2', async () => {
    await contractInstance.getActualSumOfProject(2).then(res =>
      assert.equal(3 * 100, res)
    )
  })

  it('Should contribute to a project', async () => {
    await contractInstance.contributeToProject(1,2).then(async () =>
      await contractInstance.getActualSumOfProject(1).then(res =>
        assert.equal(2 * 100, res)
      ))
  })
})
