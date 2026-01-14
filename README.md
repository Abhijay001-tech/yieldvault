# YieldVault Lite

A decentralized application (dApp) for simulating investments into tokenized real-world assets (RWAs) on Mantle Sepolia testnet. This project demonstrates how users can invest in fractionalized assets like real estate and bonds, with yield calculations performed on the frontend.

## 🌟 Features

- **Tokenized RWA Investment**: Invest in simulated real-world assets including:
  - Tokenized Office Space (Mumbai)
  - Government Bond Basket
  - Warehousing Yield Fund
- **Yield Calculator**: Calculate potential returns based on investment amount and lock periods
- **Portfolio Management**: View all your active investments and positions
- **Web3 Integration**: Connect with MetaMask to interact with the Mantle Sepolia blockchain
- **Clean UI**: Modern, responsive interface built with React

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Ethers.js v6** - Ethereum wallet and contract interaction
- **CSS** - Custom styling

### Smart Contracts
- **Solidity 0.8.20** - Smart contract language
- **Hardhat** - Ethereum development environment
- **Mantle Sepolia** - Layer 2 testnet deployment

## 📋 Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Mantle Sepolia testnet RPC access
- Test ETH on Mantle Sepolia

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd yieldvault-lite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
MANTLE_SEPOLIA_RPC_URL=your_mantle_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
```

### 4. Compile Smart Contracts

```bash
npm run contracts:compile
```

### 5. Deploy Smart Contracts

```bash
npm run contracts:deploy:mantle
```

Note: After deployment, update the contract address in your frontend configuration.

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run contracts:compile` - Compile smart contracts
- `npm run contracts:deploy:mantle` - Deploy to Mantle Sepolia

## 🏗️ Project Structure

```
yieldvault-lite/
├── contracts/           # Solidity smart contracts
│   └── YieldVault.sol  # Main vault contract
├── scripts/            # Deployment scripts
│   └── deploy.cjs      # Contract deployment script
├── src/
│   ├── components/     # React components
│   │   ├── AssetCard.jsx
│   │   ├── MyInvestments.jsx
│   │   ├── navbar.jsx
│   │   ├── Portfolio.jsx
│   │   ├── WalletConnect.jsx
│   │   └── YieldCalculator.jsx
│   ├── data/
│   │   └── mockAssets.js  # Asset definitions
│   ├── lib/
│   │   └── web3.js        # Web3 utility functions
│   ├── App.jsx
│   └── main.jsx
├── artifacts/          # Compiled contract artifacts
├── hardhat.config.cjs  # Hardhat configuration
├── vite.config.js      # Vite configuration
└── package.json
```

## 💡 How It Works

### Smart Contract

The `YieldVaultLite` contract is minimal and gas-efficient:
- Records user positions (assetId, amount, timestamp)
- Accepts ETH deposits via the `invest()` function
- Stores all positions per user
- Emits events for investment tracking

### Frontend Logic

- **Yield calculations** are performed entirely on the frontend
- Mock assets define APY, risk levels, and lock periods
- Users connect their wallet to interact with the deployed contract
- Real-time position tracking and investment history

## 🔐 Security Notes

⚠️ **This is a demo project for educational purposes:**
- Do not use with real funds on mainnet
- The contract does not implement withdrawal functionality
- No access control or admin functions
- Yield calculations are simulated, not real

## 🌐 Network Configuration

### Mantle Sepolia Testnet

- **Chain ID**: 5003
- **RPC URL**: Configure in `.env`
- **Block Explorer**: https://sepolia.mantlescan.xyz/
- **Faucet**: Get test tokens from Mantle faucet

## 📝 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Development

This project uses:
- ESLint for code linting
- Hardhat for smart contract development
- Hot Module Replacement (HMR) for fast development

---

**Built with ❤️ for the Web3 ecosystem**
