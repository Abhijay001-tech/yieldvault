import AssetCard from './AssetCard'
import './portfolio.css'

function Portfolio({ assets, onSelectAsset }) {
  return (
    <section className="portfolio-section">
      <div className="portfolio-header">
        <h2>Your Opportunities</h2>
        <p className="portfolio-subtitle">
          Browse tokenized real-world assets and simulate yield before deploying capital.
        </p>
      </div>
      <div className="portfolio-grid">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} onSelect={onSelectAsset} />
        ))}
      </div>
    </section>
  )
}

export default Portfolio

