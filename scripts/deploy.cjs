const hre = require('hardhat')

async function main() {
  const YieldVaultLite = await hre.ethers.getContractFactory('YieldVaultLite')
  const vault = await YieldVaultLite.deploy()

  await vault.waitForDeployment()

  console.log('YieldVaultLite deployed to:', await vault.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

