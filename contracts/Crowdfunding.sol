pragma solidity ^0.5.0;

contract Crowdfunding {

    struct Project {
        uint projectId;
        uint targetSum;
        uint actualSum;
        address owner;
    }

    Project[] projects;

    constructor() public{
        projects.push(Project(1, 20, 0, 0x20096293CCFCf8A78EC787666EaC566fd3Df6A37));
        projects.push(Project(2, 20, 3, 0x20096293CCFCf8A78EC787666EaC566fd3Df6A37));
        projects.push(Project(3, 20, 2, 0x20096293CCFCf8A78EC787666EaC566fd3Df6A37));
        projects.push(Project(4, 20, 4, 0x20096293CCFCf8A78EC787666EaC566fd3Df6A37));
        projects.push(Project(5, 20, 19, 0x20096293CCFCf8A78EC787666EaC566fd3Df6A37));
        projects.push(Project(6, 20, 2, 0x20096293CCFCf8A78EC787666EaC566fd3Df6A37));
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
                return projects[i].actualSum;
            }
        }
        return 0;
    }
}
