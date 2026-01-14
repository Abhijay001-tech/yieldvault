import { BrowserProvider, Contract, parseEther } from 'ethers'

// Mantle Sepolia testnet config
export const MANTLE_SEPOLIA_PARAMS = {
  chainId: '0x138b', // 5003 in hex
  chainName: 'Mantle Sepolia',
  rpcUrls: ['https://rpc.sepolia.mantle.xyz'],
  nativeCurrency: {
    name: 'Mantle',
    symbol: 'MNT',
    decimals: 18,
  },
  blockExplorerUrls: ['https://sepolia.mantlescan.xyz'],
}

// Minimal ABI for YieldVaultLite
export const YIELD_VAULT_ABI = [
  'function invest(uint256 assetId) payable',
  'function getPositions(address user) view returns (tuple(uint256 assetId,uint256 amount,uint256 timestamp)[])',
  'event Invested(address indexed user,uint256 indexed assetId,uint256 amount)',
]

// You can also override this via VITE_YIELD_VAULT_ADDRESS in .env
export const YIELD_VAULT_ADDRESS =
  import.meta.env.VITE_YIELD_VAULT_ADDRESS ||
  '0xE93eDf39Ac17Ed57565AA1e28014364149C958b8'

export async function getBrowserProvider() {
  if (!window.ethereum) {
    throw new Error('MetaMask not found')
  }
  const provider = new BrowserProvider(window.ethereum)
  return provider
}

export async function ensureMantleSepoliaNetwork() {
  if (!window.ethereum) {
    throw new Error('MetaMask not found')
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: MANTLE_SEPOLIA_PARAMS.chainId }],
    })
  } catch (switchError) {
    // 4902 = chain not added
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [MANTLE_SEPOLIA_PARAMS],
      })
    } else {
      throw switchError
    }
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask not found')
  }

  await ensureMantleSepoliaNetwork()

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  })

  return accounts[0]
}

export async function getVaultContractWithSigner() {
  if (!window.ethereum) {
    throw new Error('MetaMask not found')
  }

  if (
    !YIELD_VAULT_ADDRESS ||
    YIELD_VAULT_ADDRESS === '0x0000000000000000000000000000000000000000'
  ) {
    throw new Error('Vault contract address is not configured')
  }

  const provider = await getBrowserProvider()
  const signer = await provider.getSigner()
  return new Contract(YIELD_VAULT_ADDRESS, YIELD_VAULT_ABI, signer)
}

export async function investInAsset(assetId, amountEth) {
  const contract = await getVaultContractWithSigner()
  const value = parseEther(amountEth)
  const tx = await contract.invest(assetId, { value })
  return tx
}

export async function getUserPositions(userAddress) {
  if (
    !YIELD_VAULT_ADDRESS ||
    YIELD_VAULT_ADDRESS === '0x0000000000000000000000000000000000000000'
  ) {
    throw new Error('Vault contract address is not configured')
  }

  const provider = await getBrowserProvider()
  const contract = new Contract(YIELD_VAULT_ADDRESS, YIELD_VAULT_ABI, provider)
  const positions = await contract.getPositions(userAddress)
  
  // Convert BigInt values to readable format
  return positions.map((pos) => ({
    assetId: Number(pos.assetId),
    amount: pos.amount.toString(), // Keep as string to preserve precision
    timestamp: Number(pos.timestamp),
  }))
}
