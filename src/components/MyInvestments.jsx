import { useState, useEffect } from 'react'
import { getUserPositions } from '../lib/web3'
import { formatEther } from 'ethers'
import { assets } from '../data/mockAssets'
import './MyInvestments.css'

function MyInvestments({ account }) {
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPositions = async () => {
    if (!account) {
      setPositions([])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const userPositions = await getUserPositions(account)
      setPositions(userPositions)
    } catch (err) {
      console.error('Error fetching positions:', err)
      setError(err.message || 'Failed to fetch investments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPositions()
  }, [account])

  const getAssetById = (assetId) => {
    return assets.find((a) => a.id === assetId) || null
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatAmount = (amountWei) => {
    const amountEth = formatEther(amountWei)
    return parseFloat(amountEth).toFixed(4)
  }

  if (!account) {
    return (
      <div className="my-investments">
        <h2 className="investments-title">My Investments</h2>
        <p className="investments-empty">Connect your wallet to view your investments</p>
      </div>
    )
  }

  return (
    <div className="my-investments">
      <div className="investments-header">
        <h2 className="investments-title">My Investments</h2>
        <button onClick={fetchPositions} className="refresh-btn" disabled={loading}>
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && <div className="investments-error">⚠️ {error}</div>}

      {loading && positions.length === 0 ? (
        <div className="investments-loading">Loading your investments...</div>
      ) : positions.length === 0 ? (
        <div className="investments-empty">
          <p>No investments yet.</p>
          <p className="investments-hint">Select an asset and invest to get started!</p>
        </div>
      ) : (
        <div className="investments-list">
          {positions.map((position, index) => {
            const asset = getAssetById(position.assetId)
            return (
              <div key={index} className="investment-card">
                <div className="investment-header">
                  <h3 className="investment-asset-name">
                    {asset ? asset.name : `Asset #${position.assetId}`}
                  </h3>
                  {asset && (
                    <span className="investment-symbol">{asset.symbol}</span>
                  )}
                </div>
                <div className="investment-details">
                  <div className="investment-row">
                    <span className="investment-label">Amount Invested:</span>
                    <span className="investment-value">
                      {formatAmount(position.amount)} MNT
                    </span>
                  </div>
                  {asset && (
                    <>
                      <div className="investment-row">
                        <span className="investment-label">APY:</span>
                        <span className="investment-value">{asset.apy}%</span>
                      </div>
                      <div className="investment-row">
                        <span className="investment-label">Risk:</span>
                        <span className={`investment-risk investment-risk-${asset.risk.toLowerCase().replace(' ', '-')}`}>
                          {asset.risk}
                        </span>
                      </div>
                      <div className="investment-row">
                        <span className="investment-label">Lock Period:</span>
                        <span className="investment-value">{asset.lockPeriod}</span>
                      </div>
                    </>
                  )}
                  <div className="investment-row">
                    <span className="investment-label">Invested On:</span>
                    <span className="investment-value">{formatDate(position.timestamp)}</span>
                  </div>
                  {asset && (
                    <div className="investment-row investment-yield">
                      <span className="investment-label">Estimated Yearly Yield:</span>
                      <span className="investment-value yield-highlight">
                        {(parseFloat(formatAmount(position.amount)) * (asset.apy / 100)).toFixed(4)} MNT
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyInvestments
