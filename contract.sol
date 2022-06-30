// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SmartAD {


    struct order {
        bytes32 Order_ID;
        address buyer;
        uint256 price; 
        string  text; 
        bytes32 image1; 
        bytes32 image2; 
    }

    mapping (bytes32 => order) public Orders;

    uint256 public  HighestPrice;
    uint256 public  gap;
    address private admin;
    address private admin2;
    bytes32 Now_Order_ID;

    event Order (bytes32 Order_ID, 
                 address buyer, 
                 uint256 price, 
                 string  text, 
                 bytes32 image1, 
                 bytes32 image2);    


    constructor () {
        admin = msg.sender;
        HighestPrice = 0;
        gap = 0.00005 ether;
    }

    modifier onlyAdmin {
        require(msg.sender == admin || msg.sender == admin2);_;
    }

    function pay_me_and_say_sth(string memory _text, bytes32 _image1, bytes32 _image2) public payable {
        require(msg.value >= HighestPrice + gap, 'Incorrect value sent');
        payable(admin).transfer(msg.value);

        Now_Order_ID                  = keccak256(abi.encodePacked(msg.sender, msg.value, _text, _image1, _image2));
        Orders[Now_Order_ID].Order_ID = Now_Order_ID;
        Orders[Now_Order_ID].buyer    = msg.sender;
        Orders[Now_Order_ID].price    = msg.value;
        Orders[Now_Order_ID].text     = _text;
        Orders[Now_Order_ID].image1   = _image1;
        Orders[Now_Order_ID].image2   = _image2;
        
        HighestPrice = msg.value;

        emit Order(Now_Order_ID, msg.sender, msg.value, _text, _image1, _image2);
    }


    function setPrice(uint256 _price) external onlyAdmin {
        HighestPrice = _price;
    }

    function setGap(uint256 _gap) external onlyAdmin {
        gap = _gap;
    }

    function setAdmin2(address _admin2) external onlyAdmin {
        admin2 = _admin2;
    }
}