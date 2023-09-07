// SPDX-License-Identifier: Exhibit
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract MuseumExhibits is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private exhibitTokenId;
    address MuseumAuthority;
    struct MuseumExhibitss {
        uint256 yearOfCreations;
        string owners;
        string nameOfExhibits;
        string historys;
        bool authenticOrNot;
        address ownerAddress;
    }
    struct MuseumExhibit {
        uint256 yearOfCreation;
        string owner;
        string nameOfExhibit;
        string history;
    }
    struct sale{
        uint256 price;
        uint256 onSaleOrNot;
    }
    struct Rating
    {
        uint256 ratingSum;
        uint256 noOfRatings;
        uint256 totalRating;
    }
    MuseumExhibitss[] public requests;
    mapping(uint256 => MuseumExhibit) public exhibitDetails;
    mapping(uint256=>sale) public saleDetails;
    mapping(uint256=>Rating) public ratings;
    mapping(uint256 => address[]) allOwnersOfExhibit;
    event exhibitMinted(uint256 tokenId);
    event exhibitSold(uint256 tokenId);
    event exhibitKeptOnSale();
    modifier tokenExists(uint256 c){
        require(_exists(c)==true,"Given Token is INVALID...!!!");
        _;
    }
    modifier isOwner(address a,uint256 c){
        require(_isApprovedOrOwner(a,c)==true,"Only Owner perform this operation");
        _;
    }
    modifier exhibitIsOnSaleOrNot(uint256 c){
        require(saleDetails[c].onSaleOrNot == 1,"Exhibit is not on sale");
        _;
    }
    modifier onlyMuseumAuthority{
        require(msg.sender==MuseumAuthority,"Not Authorized");
        _;
    }

    modifier enoughFunds(uint256 a,uint256 c)
    {
        require(a >= saleDetails[c].price, "Insufficient balance");
        _;
    }
    constructor() ERC721("MuseumExhibitNFT", "ME") {
        MuseumAuthority=msg.sender;
    }

    function mintMuseumExhibit( uint256 reqID) public onlyMuseumAuthority {
        exhibitTokenId.increment();
        uint256 tokenIdOfExhibit = exhibitTokenId.current();
        _mint(requests[reqID].ownerAddress, tokenIdOfExhibit);
        requests[reqID].authenticOrNot=true;
        MuseumExhibit memory a= MuseumExhibit(requests[reqID].yearOfCreations,requests[reqID].owners,requests[reqID].nameOfExhibits,requests[reqID].historys);
        exhibitDetails[tokenIdOfExhibit]=a;
        allOwnersOfExhibit[tokenIdOfExhibit].push(msg.sender);
        emit exhibitMinted(tokenIdOfExhibit);
    }

    function requestMintingAnExhibit(uint256 yearOfCreation, string memory owner,string memory nameOfExhibit,string memory history) public {
        requests.push(MuseumExhibitss(yearOfCreation,owner,nameOfExhibit,history,false,msg.sender));
    }

    function getExhibitDetails(uint256 tokenId) public view tokenExists(tokenId) returns (MuseumExhibit memory) {
        return (exhibitDetails[tokenId]);
    }

    function getRatingsOfExhibit(uint256 tokenId) public view tokenExists(tokenId) returns (uint256){
        return ratings[tokenId].totalRating;
    }
    
     function keepExhibitOnSale(uint256 tokenId,uint256 price) public tokenExists(tokenId) isOwner(msg.sender,tokenId)  {
        saleDetails[tokenId]= sale(price,1);
        emit exhibitKeptOnSale();
    }
    function viewAllExhibits() public view returns (MuseumExhibit[] memory) {
        uint256 noOfExhibits = exhibitTokenId.current();
        MuseumExhibit[] memory allExhibits = new MuseumExhibit[](noOfExhibits);
        for (uint256 i = 0; i < noOfExhibits; i++) {
        allExhibits[i] = exhibitDetails[i+1];}
        return allExhibits;
    }
    function viewAllExhibitsOnSale() public view returns (MuseumExhibit[] memory) {
        uint256 noOfExhibits = exhibitTokenId.current();
        uint256 a=0;
        uint256 b = 0;
        for (uint256 i = 1; i <= noOfExhibits; i++) {
            if(saleDetails[i].onSaleOrNot==1){
                a++;
            }
        }
        MuseumExhibit[] memory saleExhibits = new MuseumExhibit[](a);
        for (uint256 i = 1; i <= noOfExhibits; i++) {
            if (saleDetails[i].onSaleOrNot == 1) {
                saleExhibits[b] = exhibitDetails[i];
                b++;
            }
        }
        return saleExhibits;


    }
    function removeExhibitFromSale(uint256 tokenId) public tokenExists(tokenId) isOwner(msg.sender,tokenId) exhibitIsOnSaleOrNot(tokenId) {
        //delete(saleDetails[tokenId]);
        saleDetails[tokenId].onSaleOrNot = 0;
    }

    function buyAnExhibit(uint256 tokenId) public payable tokenExists(tokenId) exhibitIsOnSaleOrNot(tokenId) enoughFunds(msg.value,tokenId) {
        sale storage salee = saleDetails[tokenId];
        address owner = ownerOf(tokenId);
        address buyer = msg.sender;
        require(owner != buyer, "You cannot buy your own Exhibit");
        payable(owner).transfer(salee.price);
        _transfer(owner, buyer, tokenId);
        allOwnersOfExhibit[tokenId].push(msg.sender);
        saleDetails[tokenId].onSaleOrNot = 0;
        emit exhibitSold(tokenId);
    }
    function getTokenId(uint256 yearOfCreation,string memory owner,string memory nameOfExhibit,string memory history) public view returns(uint256){
        for(uint256 i=1;i<=exhibitTokenId.current();i++)
        {
                if(exhibitDetails[i].yearOfCreation==yearOfCreation && (keccak256(abi.encodePacked(exhibitDetails[i].owner)) == keccak256(abi.encodePacked(owner))) && (keccak256(abi.encodePacked(exhibitDetails[i].nameOfExhibit)) == keccak256(abi.encodePacked(nameOfExhibit))) && (keccak256(abi.encodePacked(exhibitDetails[i].history)) == keccak256(abi.encodePacked(history))) )
                {
                    return i;
                }
        }
        return 0;
    }
    function getRequestId(uint256 yearOfCreations,string memory owners,string memory nameOfExhibits,string memory historys) public view returns(uint256){
        for(uint256 i=0;i<=requests.length;i++)
        {
                if(requests[i].yearOfCreations==yearOfCreations && (keccak256(abi.encodePacked(requests[i].owners)) == keccak256(abi.encodePacked(owners))) && (keccak256(abi.encodePacked(requests[i].nameOfExhibits)) == keccak256(abi.encodePacked(nameOfExhibits))) && (keccak256(abi.encodePacked(requests[i].historys)) == keccak256(abi.encodePacked(historys))) )
                {
                    return i;
                }
        }
        return 0;
    }

    function getUnMintedExhibitDetails() public view returns(MuseumExhibitss[] memory){
        MuseumExhibitss[] memory unmintedExhibits = new MuseumExhibitss[](requests.length);
        uint256 count = 0;
        for (uint256 i = 0; i < requests.length; i++) {
            if (requests[i].authenticOrNot==false) {
                unmintedExhibits[count] = requests[i];
                count++;
            }
        }
        assembly {
            mstore(unmintedExhibits, count)
        }
        return unmintedExhibits;
    }

    function getExhibitPrice(uint256 tokenId) public view tokenExists(tokenId) returns (uint256) {
        return (saleDetails[tokenId].price);

    }

    function rateAnExhibit(uint256 tokenId,uint256 rating) public tokenExists(tokenId) {
        ratings[tokenId].ratingSum+= rating;
        ratings[tokenId].noOfRatings++;
        ratings[tokenId].totalRating = ratings[tokenId].ratingSum / ratings[tokenId].noOfRatings;
    }

    function appreciateTokenPrice(uint256 tokenId, uint256 percentage) public tokenExists(tokenId) isOwner(msg.sender,tokenId) {
        require(percentage > 0 && percentage <= 100, "Percentage should be between 1 and 100");
        uint256 currentPrice = getExhibitPrice(tokenId);
        uint256 increasedAmount = (currentPrice * percentage) / 100;
        saleDetails[tokenId].price = currentPrice + increasedAmount;
    }
    function depriciateTokenPrice(uint256 tokenId, uint256 percentage) public tokenExists(tokenId) isOwner(msg.sender,tokenId) {
        require(percentage > 0 && percentage <= 100, "Percentage should be between 1 and 100");
        uint256 currentPrice = getExhibitPrice(tokenId);
        uint256 decreasedAmount = (currentPrice * percentage) / 100;
        saleDetails[tokenId].price = currentPrice - decreasedAmount;
    }
    function updateSalePrice(uint256 tokenId,uint256 newPrice) public tokenExists(tokenId) isOwner(msg.sender,tokenId)  {
        saleDetails[tokenId].price = newPrice;
    }
    function listAllOwners(uint256 tokenId) public view tokenExists(tokenId) returns (address[] memory){
        return allOwnersOfExhibit[tokenId];
    }

}
