/**
 * Deploy Script for GreenProductPassport Contract
 */

const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying GreenProductPassport contract...");

  // Get the contract factory
  const GreenProductPassport = await hre.ethers.getContractFactory("GreenProductPassport");
  
  // Deploy the contract
  const contract = await GreenProductPassport.deploy();
  await contract.deployed();

  console.log("✅ GreenProductPassport deployed to:", contract.address);

  // Add initial verifier (deployer)
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Adding deployer as verifier:", deployer.address);
  
  const tx = await contract.addVerifier(deployer.address);
  await tx.wait();

  console.log("✅ Deployment complete!");
  console.log("\n📋 Contract Details:");
  console.log("Address:", contract.address);
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer.address);

  // Wait for block confirmations before verification
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n⏳ Waiting for block confirmations...");
    await contract.deployTransaction.wait(6);
    
    console.log("\n🔍 Verifying contract on Polygonscan...");
    try {
      await hre.run("verify:verify", {
        address: contract.address,
        constructorArguments: []
      });
      console.log("✅ Contract verified!");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
    }
  }

  // Save deployment info
  const fs = require('fs');
  const deploymentInfo = {
    network: hre.network.name,
    contract: "GreenProductPassport",
    address: contract.address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: contract.deployTransaction.blockNumber
  };

  fs.writeFileSync(
    `./deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n💾 Deployment info saved to deployments/" + hre.network.name + ".json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
