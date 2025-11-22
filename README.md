# 🌐 Featured Message Board DApp // SynthWave Protocol

This repository contains the source code for a decentralized application (DApp) built on the Ethereum Virtual Machine (EVM) using the Truffle framework and Ethers.js (v5). The DApp interacts with a single smart contract deployed on a local Ganache instance (Chain ID: 1337).

--------------------------------------------------

## 🚀 Project Overview

The FeaturedMessageBoard smart contract stores a single mutable string message, tracks the address of the last updater, and allows users to "Like" the message by sending a small amount of ETH, which increments a counter.

## 🔑 Key Features

• State Management  
  Allows users to update a shared message using the setMessage function.

• Payable Functionality  
  Implements a payable function (likeMessage) that requires a contribution of 0.0001 ETH to successfully execute.

• Real-time Read/Write  
  The frontend reads the contract state (message, updater, likes) and allows transactions to modify it.

--------------------------------------------------

## 🛠️ Repository Structure

contracts/   → Solidity source code (FeaturedMessageBoard.sol)  
migrations/  → Truffle migration scripts  
src/         → Frontend DApp code (index.html & script.js)

--------------------------------------------------

## ⚙️ Setup and Dependencies

This project requires the following local development tools:

• Truffle – Global installation  
  npm install -g truffle

• Node.js & NPM – For managing project dependencies

• Ganache – Desktop application running a local EVM network  
  Port: 7545  
  Chain ID: 1337

• MetaMask – Browser extension configured to connect to Ganache  
  RPC: http://127.0.0.1:7545  
  Chain ID: 1337

--------------------------------------------------

## 🧱 1. Contract Deployment

Make sure Ganache is running and your workspace is loaded.

Then compile and deploy the contract using Truffle:

  truffle compile
  truffle migrate --reset

Verify Address:

The deployed contract address (currently configured as):

  0xFaf47083C1e627179afF1D59398d53238f41cA23

This address must match the address output by migration and the one used in:

  src/script.js

--------------------------------------------------

## 💻 2. DApp Execution

1. Import a funded Ganache account into MetaMask.

2. Use a local web server (e.g. VS Code Live Server) to open:

   src/index.html

3. Click Connect (or refresh to auto-connect).

4. Test both functions in the UI:

   • TRANSMIT MESSAGE (Non-Payable) — costs gas only  
   • CONTRIBUTE 0.0001 ETH (Payable) — costs gas + ETH value

--------------------------------------------------

## 🖼️ Submission Artifacts

The final project submission is verified through the following:

• GitHub Repository Link

• Screenshot 1 – Truffle console output showing:
  - successful contract migration
  - deployed contract address

• Screenshot 2 – MetaMask connected to Ganache showing a funded account (e.g. 99+ ETH)

• Screenshot 3 – Working DApp UI showing:
  - message updated via setMessage
  - non-zero Likes count

--------------------------------------------------


