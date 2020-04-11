pragma solidity ^0.5.16;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/Crowdfunding.sol";

contract TestCrowdfunding {


    function testTest() public{
        bool test = false;
        Assert.equal(true, test, "Default contracts migration error");
    }

}
