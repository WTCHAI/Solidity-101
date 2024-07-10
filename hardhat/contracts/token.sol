// contracts/Token.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Token  {
    string public name = "My Hardhat Token";
    string public symbol = "MHT";
    address public owner;
    mapping(address => uint256) balances;

    event transfer(address indexed _from, address indexed _to, uint256 _value);
    event deposit(uint256 amount);
    event withdraw(uint256 amount);

    constructor() {
        balances[msg.sender] = 0;
        owner = msg.sender;
    }

    function Deposit(uint256 amount) public {
        require(msg.sender == owner, "You are not the owner");
        balances[msg.sender] += amount ;
        emit deposit(amount);
    }

    function Withdraw() external {
        require(msg.sender == owner, "You are not the owner");
        balances[msg.sender] = 0;
        
        emit withdraw(balances[msg.sender]);
    }

    function Transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit transfer(msg.sender, to, amount);
    }

    function BalanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}