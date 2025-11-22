// src/script.js

// 1. CONFIGURATION CONSTANTS (CRITICAL)
// PASTE YOUR FINAL, SUCCESSFUL CONTRACT ADDRESS FROM THE LAST MIGRATION HERE:
const CONTRACT_ADDRESS = "0xFaf47083C1e627179afF1D59398d53238f41cA23"; 
// Confirmed Ganache Network ID
const GANACHE_CHAIN_ID = 1337n; 

// PASTE THE ENTIRE ABI ARRAY from FeaturedMessageBoard.json HERE:
const CONTRACT_ABI = [ 
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "initialMessage",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "currentMessage",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "lastUpdater",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "likeCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalLikesBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "likeMessage",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_newMessage",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMessage",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getLastUpdater",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getLikeCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }

]; 

let signer = null;
let contract = null;
const statusDiv = document.getElementById('status');

// 2. CONNECT AND INITIALIZE (Ethers V5 Compatible)
async function connectMetaMask() {
    if (typeof window.ethereum === 'undefined') {
        statusDiv.textContent = '❌ MetaMask not installed.';
        return;
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // --- Ethers V5 Compatibility Fix ---
        // Use Web3Provider for V5, and assume Ganache is active
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any"); 
        
        const network = await provider.getNetwork();
        // Check both decimal 1337 and hex 0x539 which MetaMask/Ganache can return
        if (network.chainId.toString() !== GANACHE_CHAIN_ID.toString() && network.chainId.toString() !== "1337") {
            statusDiv.textContent = '❌ Please switch MetaMask to the Ganache network (ID 1337)!';
            return;
        }

        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        currentAccount = await signer.getAddress();
        statusDiv.textContent = `✅ Connected to Ganache. Account: ${currentAccount.substring(0, 6)}...`;
        updateUI();

    } catch (error) {
        console.error("Connection failed:", error);
        statusDiv.textContent = `Connection failed: ${error.message}`;
    }
}

// 3. READ FUNCTIONS
async function updateUI() {
    if (!contract) return;
    try {
        const message = await contract.getMessage();
        const updater = await contract.getLastUpdater();
        const likes = await contract.getLikeCount();

        document.getElementById('currentMessage').textContent = message;
        document.getElementById('lastUpdater').textContent = updater;
        document.getElementById('likeCount').textContent = likes.toString();
    } catch(e) {
        console.error("Error reading contract data:", e);
    }
}

// 4. WRITE FUNCTION (State Change)
async function setMessage() {
    if (!contract) return;
    const newMessage = document.getElementById('newMessage').value;
    if (!newMessage) return;

    statusDiv.textContent = 'Sending transaction...';
    try {
        const tx = await contract.setMessage(newMessage);
        statusDiv.textContent = `Transaction sent: ${tx.hash.substring(0, 10)}... Waiting for confirmation.`;
        
        await tx.wait(); // Wait for the transaction to be mined
        statusDiv.textContent = 'Message updated successfully!';
        updateUI(); // Refresh the display
    } catch (error) {
        statusDiv.textContent = `Transaction failed: ${error.reason || error.message}`;
    }
}

// 5. WRITE FUNCTION (Payable/Value)
async function likeMessage() {
    if (!contract) return;
    statusDiv.textContent = 'Sending like transaction...';
    
    // V5 FIX: Use ethers.utils.parseEther to set the value correctly
    const valueInWei = ethers.utils.parseEther("0.0001"); 
    
    try {
        const tx = await contract.likeMessage({ value: valueInWei });
        statusDiv.textContent = `Transaction sent: ${tx.hash.substring(0, 10)}... Waiting for confirmation.`;
        
        await tx.wait(); // Wait for the transaction to be mined
        statusDiv.textContent = 'Like recorded successfully!';
        updateUI(); // Refresh the display
    } catch (error) {
        // This is necessary to handle cases where the user rejects the transaction
        statusDiv.textContent = `Like failed: ${error.reason || error.message}`;
    }
}

// 6. INITIALIZATION: This must be the last line in the file!
connectMetaMask();