// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.1;

contract Token{

    uint256 public totalChainSupply = 10000000;
    address public owner;
    mapping (address => uint) balance;

    event Transfer(address indexed _from , address indexed _to, uint256 _value);

    constructor (){
        balance[msg.sender] = totalChainSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) public{
        require(balance[msg.sender] >= amount,"Insufficient Funds");
        balance[msg.sender] -= amount;
        balance[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns(uint256){
        return balance[account];
    }
}