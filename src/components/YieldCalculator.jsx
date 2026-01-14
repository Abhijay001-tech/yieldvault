import { useMemo, useState } from 'react'
import './YieldCalculator.css'
import { investInAsset } from '../lib/web3'

function formatCurrency(num) {
  if (Number.isNaN(num)) return '-'
  return num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })
}

function YieldCalculator({ asset, account, onInvestSuccess }) {
  const [amount, setAmount] = useState('')
  const [investing, setInvesting] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  const parsedAmount = useMemo(() => {
    const v = parseFloat(amount || '0')
    return Number.isNaN(v) ? 0 : v
  }, [amount])

  const yearlyYield = useMemo(() => {
    if (!asset) return 0
    return (parsedAmount * asset.apy) / 100
  }, [asset, parsedAmount])

  const monthlyYield = useMemo(() => yearlyYield / 12, [yearlyYield])

  const canInvest = !!asset && !!account && parsedAmount > 0

  const handleInvest = async () => {
    if (!canInvest) return
    setError('')
    setTxHash('')
    setInvesting(true)
    try {
      const tx = await investInAsset(asset.id, parsedAmount.toString())
      setTxHash(tx.hash)
      await tx.wait()
      // Clear amount and refresh investments
      setAmount('')
      if (onInvestSuccess) {
        onInvestSuccess()
      }
    } catch (e) {
      console.error(e)
      if (e.message?.includes('Vault contract address is not configured')) {
        setError('Set VITE_YIELD_VAULT_ADDRESS in a .env file after deploying the contract.')
      } else if (e.code === 'ACTION_REJECTED' || e.code === 4001) {
        setError('Transaction was rejected in wallet.')
      } else {
        setError('Failed to send transaction.')
      }
    } finally {
      setInvesting(false)
    }
  }

  if (!asset) {
    return (
      <section className="calculator-panel">
        <h2>Yield Simulator</h2>
        <p className="calculator-placeholder">
          Select an asset from the list to see APY, lock period and simulate yield.
        </p>
      </section>
    )
  }

  return (
    <section className="calculator-panel">
      <h2>Yield Simulator</h2>
      <p className="calculator-asset">
        For <strong>{asset.name}</strong> ({asset.symbol})
      </p>

      <div className="calculator-field-group">
        <label htmlFor="amount" className="calculator-label">
          Amount to simulate (in MNT)
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="calculator-input"
          placeholder="e.g. 1.5"
        />
      </div>

      <div className="calculator-metrics">
        <div className="calculator-metric">
          <span className="metric-label">APY</span>
          <span className="metric-value">{asset.apy}%</span>
        </div>
        <div className="calculator-metric">
          <span className="metric-label">Estimated yearly yield</span>
          <span className="metric-value">
            {parsedAmount > 0 ? `${formatCurrency(yearlyYield)} MNT` : '-'}
          </span>
        </div>
        <div className="calculator-metric">
          <span className="metric-label">Estimated monthly yield</span>
          <span className="metric-value">
            {parsedAmount > 0 ? `${formatCurrency(monthlyYield)} MNT` : '-'}
          </span>
        </div>
        <div className="calculator-metric">
          <span className="metric-label">Lock period</span>
          <span className="metric-value">{asset.lockPeriod}</span>
        </div>
        <div className="calculator-metric">
          <span className="metric-label">Risk</span>
          <span className="metric-value">{asset.risk}</span>
        </div>
      </div>

      <button
        type="button"
        className="calculator-invest-btn"
        disabled={!canInvest || investing}
        onClick={handleInvest}
      >
        {account
          ? investing
            ? 'Sending transaction...'
            : 'Invest on Mantle Sepolia'
          : 'Connect wallet to invest'}
      </button>

      {error && <p className="calculator-error">{error}</p>}
      {txHash && (
        <p className="calculator-tx">
          Tx submitted:{' '}
          <a
            href={`https://sepolia.mantlescan.xyz/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            View on explorer
          </a>
        </p>
      )}
    </section>
  )
}

export default YieldCalculator

