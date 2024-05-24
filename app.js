const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
  // ABI goes here. Replace this comment with the ABI from Remix.
];

let web3;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    generateFallingTokens();
});

async function recast() {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    const cryptoNames = ["Bitcoin", "Ethereum", "Litecoin", "Polkadot", "Cardano"];
    const cryptoImages = {
        "Bitcoin": "https://example.com/bitcoin.png",
        "Ethereum": "https://example.com/ethereum.png",
        "Litecoin": "https://example.com/litecoin.png",
        "Polkadot": "https://example.com/polkadot.png",
        "Cardano": "https://example.com/cardano.png"
    };
    
    const chosenCrypto = cryptoNames[Math.floor(Math.random() * cryptoNames.length)];

    await contract.methods.chooseCrypto(chosenCrypto).send({ from: userAddress });
    
    document.getElementById('crypto-result').innerText = `You are ${chosenCrypto}!`;
    document.getElementById('crypto-image').src = cryptoImages[chosenCrypto];
    document.getElementById('crypto-image').style.display = 'block';
}

function generateFallingTokens() {
    const tokenContainer = document.querySelector('.falling-tokens');
    const tokenImages = [
        "https://example.com/token1.png",
        "https://example.com/token2.png",
        "https://example.com/token3.png"
    ];
    
    for (let i = 0; i < 50; i++) {
        const token = document.createElement('img');
        token.src = tokenImages[Math.floor(Math.random() * tokenImages.length)];
        token.classList.add('falling-token');
        token.style.left = `${Math.random() * 100}%`;
        token.style.animationDuration = `${Math.random() * 5 + 5}s`;
        tokenContainer.appendChild(token);
    }
}
