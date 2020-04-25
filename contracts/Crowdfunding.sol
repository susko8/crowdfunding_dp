pragma solidity ^0.5.0;

contract Crowdfunding {

    struct Project {
        uint projectId;
        uint targetSum;
        uint actualSum;
        address owner;
    }

    event Donation(address sender, uint projectId, uint sum);

    Project[] projects;

    constructor() public{
        projects.push(Project(1, 2000, 0, 0x8A7d043B9353a77EfDB59B5c887d005E5711B08e));
        projects.push(Project(2, 2000, 300, 0x8A7d043B9353a77EfDB59B5c887d005E5711B08e));
        projects.push(Project(3, 2000, 200, 0x8A7d043B9353a77EfDB59B5c887d005E5711B08e));
        projects.push(Project(4, 2000, 400, 0x8A7d043B9353a77EfDB59B5c887d005E5711B08e));
        projects.push(Project(5, 2000, 1900, 0x8A7d043B9353a77EfDB59B5c887d005E5711B08e));
        projects.push(Project(6, 2000, 200, 0x8A7d043B9353a77EfDB59B5c887d005E5711B08e));
    }

    function addNewProject(uint _projectid, uint _targetSum) payable public {
        projects.push(Project(_projectid, _targetSum, 0, msg.sender));
    }

    function contributeToProject(uint _projectId, uint _sum) payable public {
        for (uint i = 0; i < projects.length; i++) {
            if (projects[i].projectId == _projectId) {
                projects[i].actualSum = projects[i].actualSum + _sum;
                address payable payAddress = address(uint160(projects[i].owner));
                payAddress.transfer(msg.value);

                // emit event
                emit Donation(msg.sender, _projectId, _sum);
            }
        }
    }

    function getNumberProjects() public view returns (uint) {
        return projects.length;
    }

    function getActualProjectStatus(uint _projectId) public view returns (uint, uint) {
        for (uint i = 0; i < projects.length; i++) {
            if (projects[i].projectId == _projectId) {
                return (projects[i].actualSum, projects[i].targetSum);
            }
        }
        return (0,0);
    }

    function getActualSumOfProject(uint _projectId) public view returns (uint){
        for (uint i = 0; i < projects.length; i++) {
            if (projects[i].projectId == _projectId) {
                return projects[i].actualSum * 100;
            }
        }
        return 0;
    }
}
