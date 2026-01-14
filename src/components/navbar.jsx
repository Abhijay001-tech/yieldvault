import './navbar.css'

function Navbar({ account }) {
  return (
    <nav className="yv-navbar">
      <div className="yv-navbar-left">
        <span className="yv-logo">YieldVault Lite</span>
        <span className="yv-tag">Mantle Sepolia</span>
      </div>
      <div className="yv-navbar-right">
        {account ? (
          <span className="yv-account-pill">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <span className="yv-account-pill yv-account-pill--disconnected">Wallet not connected</span>
        )}
      </div>
    </nav>
  )
}

export default Navbar

