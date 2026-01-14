// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title YieldVaultLite
/// @notice Minimal vault to demo investing into tokenized RWA strategies.
///         Frontend does all yield math; contract just records deposits.
contract YieldVaultLite {
    /// @dev assetId is a frontend-defined identifier (e.g., from mockAssets.js)
    struct Position {
        uint256 assetId;
        uint256 amount; // in wei
        uint256 timestamp;
    }

    mapping(address => Position[]) public positions;

    event Invested(address indexed user, uint256 indexed assetId, uint256 amount);

    /// @notice Simple invest function: sends ETH to contract and records position.
    /// @param assetId Frontend-defined ID of the asset the user is investing into.
    function invest(uint256 assetId) external payable {
        require(msg.value > 0, "No value sent");

        positions[msg.sender].push(
            Position({assetId: assetId, amount: msg.value, timestamp: block.timestamp})
        );

        emit Invested(msg.sender, assetId, msg.value);
    }

    /// @notice Returns all positions for a given user.
    function getPositions(address user) external view returns (Position[] memory) {
        return positions[user];
    }
}

