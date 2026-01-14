import './AssetCard.css'

function AssetCard({ asset, onSelect }) {
  return (
    <button className="asset-card" onClick={() => onSelect(asset)}>
      <div className="asset-card-header">
        <div>
          <h3 className="asset-title">
            {asset.name} <span className="asset-symbol">{asset.symbol}</span>
          </h3>
          <p className="asset-description">{asset.description}</p>
        </div>
        <div className="asset-apy">
          <span className="asset-apy-label">APY</span>
          <span className="asset-apy-value">{asset.apy}%</span>
        </div>
      </div>
      <div className="asset-meta">
        <span className="asset-meta-pill">
          Risk: <strong>{asset.risk}</strong>
        </span>
        <span className="asset-meta-pill">
          Lock: <strong>{asset.lockPeriod}</strong>
        </span>
      </div>
    </button>
  )
}

export default AssetCard

