//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity ^0.8.20;


contract FundingProject is Ownable{ 
    constructor() Ownable(msg.sender) {

        
    }
}