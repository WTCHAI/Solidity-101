// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloWorld {
    string public greet;
    address public owner;

    constructor(string memory _greet) {
        greet = _greet;
        owner = msg.sender; // Set the owner to the deployer's address
    }

    function Greeting() public view returns (string memory) {
        return greet;
    }

    
}