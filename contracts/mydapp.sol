// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FeaturedMessageBoard {
    // State Variables
    string public currentMessage;
    address public lastUpdater;
    uint256 public likeCount; 
    uint256 public totalLikesBalance; // Tracks total ETH sent to like the message

    // Constructor: Takes one argument (Initial Message)
    constructor(string memory initialMessage) {
        currentMessage = initialMessage;
        lastUpdater = msg.sender;
    }

    // 1. Write Function (State change with value) - BONUS/PAYABLE
    // Allows sending ETH to increase the like count.
    function likeMessage() public payable {
        // Require a minimum value (e.g., 0.0001 ETH = 100,000,000,000,000 Wei)
        require(msg.value >= 100000000000000, "Minimum 0.0001 ETH required to like."); 
        likeCount++;
        totalLikesBalance += msg.value;
    }

    // 2. Write Function (State change) - REQUIRED
    function setMessage(string memory _newMessage) public {
        currentMessage = _newMessage;
        lastUpdater = msg.sender;
    }

    // 3. Read Function (Automatic Getter) - REQUIRED
    function getMessage() public view returns (string memory) {
        return currentMessage;
    }

    // 4. Read Function (Automatic Getter)
    function getLastUpdater() public view returns (address) {
        return lastUpdater;
    }

    // 5. Read Function (Automatic Getter)
    function getLikeCount() public view returns (uint256) {
        return likeCount;
    }
}