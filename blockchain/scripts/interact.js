/**
 * Interact with GreenProductPassport Contract
 * 
 * Script để mint NFT passport, verify và quản lý certifications
 */

const { ethers } = require("hardhat");
const { create } = require('ipfs-http-client');

// IPFS client configuration
const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      process.env.IPFS_PROJECT_ID + ':' + process.env.IPFS_PROJECT_SECRET
    ).toString('base64')}`
  }
});

/**
 * Upload metadata to IPFS
 */
async function uploadToIPFS(metadata) {
  try {
    const result = await ipfsClient.add(JSON.stringify(metadata));
    const ipfsHash = result.path;
    const ipfsURI = `ipfs://${ipfsHash}`;
    console.log("📤 Uploaded to IPFS:", ipfsURI);
    return ipfsURI;
  } catch (error) {
    console.error("❌ IPFS upload failed:", error);
    throw error;
  }
}

/**
 * Mint Green Product Passport
 */
async function mintPassport(contractAddress, productData) {
  const contract = await ethers.getContractAt("GreenProductPassport", contractAddress);
  
  // Prepare metadata
  const metadata = {
    name: productData.name,
    description: productData.description,
    image: productData.image,
    attributes: [
      {
        trait_type: "Product ID",
        value: productData.productId
      },
      {
        trait_type: "Carbon Footprint",
        value: productData.carbonFootprint,
        display_type: "number",
        unit: "kg CO2e"
      },
      {
        trait_type: "ESG Score",
        value: productData.esgScore,
        display_type: "number",
        max_value: 100
      },
      {
        trait_type: "Category",
        value: productData.category
      },
      {
        trait_type: "Manufacturer",
        value: productData.manufacturer
      }
    ],
    external_url: `https://ecoconnect.vn/products/${productData.productId}`,
    sustainability: productData.sustainability,
    certifications: productData.certifications,
    production: productData.production,
    lifecycle: productData.lifecycle
  };

  // Upload to IPFS
  const tokenURI = await uploadToIPFS(metadata);

  // Mint NFT
  console.log("🪙 Minting passport...");
  const tx = await contract.mintPassport(
    productData.manufacturer,
    productData.productId,
    tokenURI,
    Math.floor(productData.carbonFootprint * 1000), // Convert to integer
    productData.esgScore
  );

  const receipt = await tx.wait();
  const event = receipt.events.find(e => e.event === 'PassportMinted');
  const tokenId = event.args.tokenId;

  console.log("✅ Passport minted! Token ID:", tokenId.toString());
  console.log("📄 Transaction:", receipt.transactionHash);

  return tokenId;
}

/**
 * Verify passport
 */
async function verifyPassport(contractAddress, tokenId) {
  const contract = await ethers.getContractAt("GreenProductPassport", contractAddress);
  
  console.log(`🔍 Verifying passport #${tokenId}...`);
  const tx = await contract.verifyPassport(tokenId);
  await tx.wait();
  
  console.log("✅ Passport verified!");
}

/**
 * Add certification
 */
async function addCertification(contractAddress, tokenId, certification) {
  const contract = await ethers.getContractAt("GreenProductPassport", contractAddress);
  
  console.log(`📜 Adding certification to passport #${tokenId}...`);
  const tx = await contract.addCertification(
    tokenId,
    certification.name,
    certification.issuer,
    Math.floor(new Date(certification.validUntil).getTime() / 1000)
  );
  await tx.wait();
  
  console.log("✅ Certification added!");
}

/**
 * Get product info
 */
async function getProductInfo(contractAddress, tokenId) {
  const contract = await ethers.getContractAt("GreenProductPassport", contractAddress);
  
  const info = await contract.getProductInfo(tokenId);
  const certifications = await contract.getCertifications(tokenId);
  
  console.log("\n📦 Product Passport Information:");
  console.log("Product ID:", info.productId);
  console.log("Manufacturer:", info.manufacturer);
  console.log("Carbon Footprint:", (info.carbonFootprint / 1000).toFixed(2), "kg CO2e");
  console.log("ESG Score:", info.esgScore.toString());
  console.log("Created:", new Date(info.createdAt * 1000).toISOString());
  console.log("Verified:", info.verified);
  console.log("\nCertifications:", certifications.length);
  
  certifications.forEach((cert, i) => {
    console.log(`  ${i + 1}. ${cert.name} (${cert.issuer})`);
    console.log(`     Valid until: ${new Date(cert.validUntil * 1000).toLocaleDateString()}`);
  });
}

/**
 * Example usage
 */
async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "0x...";
  
  // Example product data
  const productData = {
    productId: "PROD-ECO-001",
    name: "Organic Cotton T-Shirt",
    description: "100% organic cotton t-shirt made with sustainable practices",
    image: "ipfs://Qm...",
    category: "Fashion",
    manufacturer: "0x...", // Replace with actual address
    carbonFootprint: 2.5, // kg CO2e
    esgScore: 85,
    sustainability: {
      recyclable: true,
      biodegradable: true,
      renewable: true,
      locallySourced: true,
      fairTrade: true
    },
    certifications: [
      "GOTS",
      "Fair Trade",
      "Carbon Neutral"
    ],
    production: {
      country: "Vietnam",
      factory: "Green Textiles Ltd.",
      workers: 150,
      energySource: "100% Renewable"
    },
    lifecycle: {
      expectedDuration: "5 years",
      endOfLife: "Fully biodegradable"
    }
  };

  // Mint passport
  const tokenId = await mintPassport(contractAddress, productData);

  // Verify passport (only by authorized verifier)
  // await verifyPassport(contractAddress, tokenId);

  // Add certification
  // await addCertification(contractAddress, tokenId, {
  //   name: "Carbon Neutral Certified",
  //   issuer: "International Carbon Registry",
  //   validUntil: "2025-12-31"
  // });

  // Get product info
  // await getProductInfo(contractAddress, tokenId);
}

// Run if called directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = {
  uploadToIPFS,
  mintPassport,
  verifyPassport,
  addCertification,
  getProductInfo
};
