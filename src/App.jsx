import { useState } from 'react'
import './App.css'
import { assets } from './data/mockAssets'
import Navbar from './components/navbar'
import Portfolio from './components/portfolio'
import YieldCalculator from './components/YieldCalculator'
import WalletConnect from './components/WalletConnect'
import MyInvestments from './components/MyInvestments'

function App() {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [account, setAccount] = useState(null)
  const [refreshInvestments, setRefreshInvestments] = useState(0)

  return (
    <div className="app-root">
      <Navbar account={account} />

      <main className="app-main">
        <section className="app-left">
          <header className="section-header">
            <div>
              <h1 className="app-title">YieldVault Lite</h1>
              <p className="app-subtitle">
                Simulate yield from tokenized real-world assets on Mantle Sepolia.
              </p>
            </div>
            <WalletConnect onConnected={setAccount} />
          </header>

          <Portfolio assets={assets} onSelectAsset={setSelectedAsset} />
          
          <MyInvestments account={account} key={refreshInvestments} />
        </section>

        <section className="app-right">
          <YieldCalculator 
            asset={selectedAsset} 
            account={account}
            onInvestSuccess={() => setRefreshInvestments((prev) => prev + 1)}
          />
        </section>
      </main>
    </div>
  )
}

export default App
