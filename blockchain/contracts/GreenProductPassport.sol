// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title GreenProductPassport
 * @dev NFT Contract cho Hộ chiếu sản phẩm xanh
 * 
 * Mỗi NFT đại diện cho một sản phẩm xanh được xác thực
 * với metadata lưu trên IPFS
 */
contract GreenProductPassport is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Struct lưu thông tin sản phẩm
    struct ProductInfo {
        string productId;           // ID sản phẩm từ database
        address manufacturer;       // Địa chỉ nhà sản xuất
        uint256 carbonFootprint;    // Carbon footprint (kg CO2e * 1000)
        uint8 esgScore;            // Điểm ESG (0-100)
        uint256 createdAt;         // Timestamp tạo
        bool verified;             // Đã được xác thực chưa
    }

    // Struct cho chứng nhận xanh
    struct Certification {
        string name;               // Tên chứng nhận
        string issuer;             // Tổ chức cấp
        uint256 validUntil;        // Hạn sử dụng
        bool isActive;             // Còn hiệu lực không
    }

    // Mapping tokenId => ProductInfo
    mapping(uint256 => ProductInfo) public products;
    
    // Mapping tokenId => Certifications
    mapping(uint256 => Certification[]) public certifications;
    
    // Mapping manufacturer => tokenIds
    mapping(address => uint256[]) public manufacturerProducts;
    
    // Mapping productId => tokenId
    mapping(string => uint256) public productIdToToken;

    // Địa chỉ verifier có quyền xác thực
    mapping(address => bool) public verifiers;

    // Events
    event PassportMinted(
        uint256 indexed tokenId,
        string productId,
        address indexed manufacturer,
        uint256 carbonFootprint,
        uint8 esgScore
    );

    event PassportVerified(
        uint256 indexed tokenId,
        address indexed verifier
    );

    event CertificationAdded(
        uint256 indexed tokenId,
        string certificationName,
        string issuer
    );

    event CarbonFootprintUpdated(
        uint256 indexed tokenId,
        uint256 oldValue,
        uint256 newValue
    );

    constructor() ERC721("Green Product Passport", "GPP") {}

    /**
     * @dev Thêm verifier
     */
    function addVerifier(address verifier) public onlyOwner {
        verifiers[verifier] = true;
    }

    /**
     * @dev Xóa verifier
     */
    function removeVerifier(address verifier) public onlyOwner {
        verifiers[verifier] = false;
    }

    /**
     * @dev Modifier kiểm tra verifier
     */
    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner(), "Not authorized verifier");
        _;
    }

    /**
     * @dev Mint passport mới cho sản phẩm
     * 
     * @param to Địa chỉ nhận NFT
     * @param productId ID sản phẩm
     * @param tokenURI IPFS URI chứa metadata
     * @param carbonFootprint Carbon footprint (kg CO2e * 1000)
     * @param esgScore Điểm ESG (0-100)
     */
    function mintPassport(
        address to,
        string memory productId,
        string memory tokenURI,
        uint256 carbonFootprint,
        uint8 esgScore
    ) public returns (uint256) {
        require(esgScore <= 100, "ESG score must be <= 100");
        require(productIdToToken[productId] == 0, "Product passport already exists");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        products[tokenId] = ProductInfo({
            productId: productId,
            manufacturer: to,
            carbonFootprint: carbonFootprint,
            esgScore: esgScore,
            createdAt: block.timestamp,
            verified: false
        });

        manufacturerProducts[to].push(tokenId);
        productIdToToken[productId] = tokenId;

        emit PassportMinted(tokenId, productId, to, carbonFootprint, esgScore);

        return tokenId;
    }

    /**
     * @dev Xác thực passport
     */
    function verifyPassport(uint256 tokenId) public onlyVerifier {
        require(_exists(tokenId), "Token does not exist");
        require(!products[tokenId].verified, "Already verified");

        products[tokenId].verified = true;

        emit PassportVerified(tokenId, msg.sender);
    }

    /**
     * @dev Thêm chứng nhận xanh
     */
    function addCertification(
        uint256 tokenId,
        string memory name,
        string memory issuer,
        uint256 validUntil
    ) public {
        require(_exists(tokenId), "Token does not exist");
        require(
            ownerOf(tokenId) == msg.sender || msg.sender == owner(),
            "Not authorized"
        );

        certifications[tokenId].push(Certification({
            name: name,
            issuer: issuer,
            validUntil: validUntil,
            isActive: true
        }));

        emit CertificationAdded(tokenId, name, issuer);
    }

    /**
     * @dev Cập nhật carbon footprint
     */
    function updateCarbonFootprint(
        uint256 tokenId,
        uint256 newCarbonFootprint
    ) public {
        require(_exists(tokenId), "Token does not exist");
        require(
            ownerOf(tokenId) == msg.sender || verifiers[msg.sender],
            "Not authorized"
        );

        uint256 oldValue = products[tokenId].carbonFootprint;
        products[tokenId].carbonFootprint = newCarbonFootprint;

        emit CarbonFootprintUpdated(tokenId, oldValue, newCarbonFootprint);
    }

    /**
     * @dev Lấy thông tin sản phẩm
     */
    function getProductInfo(uint256 tokenId) public view returns (
        string memory productId,
        address manufacturer,
        uint256 carbonFootprint,
        uint8 esgScore,
        uint256 createdAt,
        bool verified
    ) {
        require(_exists(tokenId), "Token does not exist");
        ProductInfo memory info = products[tokenId];
        return (
            info.productId,
            info.manufacturer,
            info.carbonFootprint,
            info.esgScore,
            info.createdAt,
            info.verified
        );
    }

    /**
     * @dev Lấy danh sách chứng nhận
     */
    function getCertifications(uint256 tokenId) public view returns (Certification[] memory) {
        require(_exists(tokenId), "Token does not exist");
        return certifications[tokenId];
    }

    /**
     * @dev Lấy tổng số passport đã mint
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Lấy danh sách token của manufacturer
     */
    function getManufacturerProducts(address manufacturer) public view returns (uint256[] memory) {
        return manufacturerProducts[manufacturer];
    }

    /**
     * @dev Override required functions
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
