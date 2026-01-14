import { useState, useEffect } from 'react'
import './WalletConnect.css'
import { connectWallet } from '../lib/web3'

function WalletConnect({ onConnected }) {
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState('')
  const [account, setAccount] = useState(null)

  useEffect(() => {
    if (!window.ethereum) return

    const handler = (accounts) => {
      const acc = accounts[0] || null
      setAccount(acc)
      onConnected?.(acc)
    }

    window.ethereum.on('accountsChanged', handler)
    return () => {
      window.ethereum.removeListener('accountsChanged', handler)
    }
  }, [onConnected])

  const handleConnect = async () => {
    setError('')
    setConnecting(true)
    try {
      const acc = await connectWallet()
      setAccount(acc)
      onConnected?.(acc)
    } catch (e) {
      console.error(e)
      if (e.message?.includes('MetaMask')) {
        setError('Please install MetaMask to continue.')
      } else if (e.code === 4001) {
        setError('Connection request was rejected.')
      } else {
        setError('Failed to connect wallet.')
      }
    } finally {
      setConnecting(false)
    }
  }

  if (!window.ethereum) {
    return (
      <button
        type="button"
        className="wallet-btn wallet-btn--disabled"
        disabled
        title="MetaMask not detected"
      >
        Install MetaMask
      </button>
    )
  }

  return (
    <div className="wallet-connect-wrapper">
      <button
        type="button"
        className="wallet-btn"
        onClick={handleConnect}
        disabled={connecting}
      >
        {account ? 'Connected' : connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && <span className="wallet-error">{error}</span>}
    </div>
  )
}

export default WalletConnect

