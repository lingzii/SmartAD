// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SmartMessageBoard {

    uint256 public  highestPrice;
    uint256 public  gap;
    string  public  message;
    address private admin;

    constructor (string memory first_message) {
        admin = msg.sender;
        gap = 0.0001 ether;
        highestPrice = 0;
        message = first_message;
    }

    modifier onlyAdmin {
        require(msg.sender == admin) ;_;
    }

    function transaction_to_update(string memory text) public payable {
        require(highestPrice + gap <= msg.value, "Incorrect value sent");
        payable(admin).transfer(msg.value);
        highestPrice = msg.value; 
        message = text;
    }

    function setPrice(uint256 new_price) external onlyAdmin {
        highestPrice = new_price;
    }

    function setGap(uint256 new_gap) external onlyAdmin {
        gap = new_gap;
    }
}