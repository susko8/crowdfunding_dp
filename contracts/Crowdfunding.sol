pragma solidity ^0.5.0;

contract Crowdfunding {

    struct Project {
        uint projectId;
        uint targetSum;
        uint actualSum;
    }

    Project[] public projects;

    constructor() public{
        projects.push(Project(1, 20, 0));
        projects.push(Project(2, 20, 0));
        projects.push(Project(3, 20, 0));
        projects.push(Project(4, 20, 0));
        projects.push(Project(5, 20, 0));
        projects.push(Project(6, 20, 0));
    }

    function addNewProject(uint _projectid, uint _targetSum, uint _startingSum) public {
        projects.push(Project(_projectid, _targetSum, _startingSum));
    }
//
//    function contributeToProject(uint _projectId, uint _sum) payable public {
//        for (uint i = 0; i < projects.length; i++) {
//            if (projects[i].projectId() == _projectId) {
//                projects[i].contribute(_sum);
//            }
//        }
//    }

    function getNumberProjects() public view returns (uint) {
        return projects.length;
    }
}
