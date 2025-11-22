Featured Message Board DApp // SynthWave Protocol

This repository contains the source code for a decentralized application (DApp) built on the Ethereum Virtual Machine (EVM) using the Truffle framework and the Ethers.js library (v5). The DApp interacts with a single smart contract deployed on a local Ganache instance (Chain ID 1337).

🚀 Project Overview

The FeaturedMessageBoard smart contract stores a single mutable string message, tracks the address of the last updater, and allows users to "Like" the message by sending a small amount of ETH, which increments a counter.

Key Features:

State Management: Allows users to update a shared message (setMessage).

Payable Functionality: Implements a payable function (likeMessage) that requires a contribution of 0.0001 ETH to successfully execute.

Real-time Read/Write: The frontend reads the contract state (message, updater, likes) and allows transactions to modify it.

🛠️ Repository Structure

contracts/: Contains the Solidity source code (.sol).

migrations/: Contains the Truffle migration scripts (.js).

src/: Contains the frontend DApp code (index.html and script.js).

⚙️ Setup and Dependencies

This project requires the following to run locally:

Truffle: Global installation (npm install -g truffle).

Node.js & NPM: For managing dependencies.

Ganache: Desktop application running a local EVM network on port 7545 (Chain ID 1337).

MetaMask: Browser extension configured to connect to the Ganache network (RPC: http://127.0.0.1:7545, Chain ID: 1337).

Contract Deployment

Ensure Ganache is running.

Compile and deploy the contract using Truffle:

truffle compile
truffle migrate --reset


Update the CONTRACT_ADDRESS in src/script.js with the address outputted by the migration. (Currently set to: 0xFaf47083C1e627179afF1D59398d53238f41cA23)

DApp Execution

Use a local web server (like VS Code's Live Server extension) to open src/index.html.

Connect MetaMask (ensure a funded account is selected).

Test both the setMessage (gas-only) and likeMessage (payable) functions.

🖼️ Required Screenshots

Screenshot 1 (Deployment): Truffle console output showing successful contract migration.

Screenshot 2 (MetaMask): MetaMask configured to the Ganache network (Chain ID 1337) with a funded account selected.

Screenshot 3 (Functional DApp): The DApp UI (src/index.html) running on a local server, connected to MetaMask, showing an updated message and a non-zero "Likes" count.