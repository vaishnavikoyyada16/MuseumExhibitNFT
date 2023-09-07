web3= new Web3(window.web3.currentProvider); 
var Contract;
var contractAddress='0x5184d8D1C491F52831A32E7A0d4242130C72Ef99';
var sc_abi;
var currentAccount;
if(window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
        window.location.reload();
    });
}
async function currentAccountAddress(){
    const act = await ethereum.request({ method: 'eth_requestAccounts'});
    return act[0];
}
currentAccountAddress().then((value)=>{currentAccount = value;});

sc_abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "exhibitKeptOnSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "exhibitMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "exhibitSold",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "percentage",
				"type": "uint256"
			}
		],
		"name": "appreciateTokenPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyAnExhibit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "percentage",
				"type": "uint256"
			}
		],
		"name": "depriciateTokenPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exhibitDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "yearOfCreation",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "owner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nameOfExhibit",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "history",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getExhibitDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "yearOfCreation",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owner",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nameOfExhibit",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "history",
						"type": "string"
					}
				],
				"internalType": "struct MuseumExhibits.MuseumExhibit",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getExhibitPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getRatingsOfExhibit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "yearOfCreations",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "owners",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nameOfExhibits",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "historys",
				"type": "string"
			}
		],
		"name": "getRequestId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "yearOfCreation",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "owner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nameOfExhibit",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "history",
				"type": "string"
			}
		],
		"name": "getTokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUnMintedExhibitDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "yearOfCreations",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owners",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nameOfExhibits",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "historys",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "authenticOrNot",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "ownerAddress",
						"type": "address"
					}
				],
				"internalType": "struct MuseumExhibits.MuseumExhibitss[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "keepExhibitOnSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "listAllOwners",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "reqID",
				"type": "uint256"
			}
		],
		"name": "mintMuseumExhibit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			}
		],
		"name": "rateAnExhibit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ratings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ratingSum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "noOfRatings",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalRating",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "removeExhibitFromSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "yearOfCreation",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "owner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nameOfExhibit",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "history",
				"type": "string"
			}
		],
		"name": "requestMintingAnExhibit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "requests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "yearOfCreations",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "owners",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nameOfExhibits",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "historys",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "authenticOrNot",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "ownerAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "saleDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "onSaleOrNot",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "updateSalePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAllExhibits",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "yearOfCreation",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owner",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nameOfExhibit",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "history",
						"type": "string"
					}
				],
				"internalType": "struct MuseumExhibits.MuseumExhibit[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAllExhibitsOnSale",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "yearOfCreation",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owner",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nameOfExhibit",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "history",
						"type": "string"
					}
				],
				"internalType": "struct MuseumExhibits.MuseumExhibit[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
Contract = new web3.eth.Contract(sc_abi,contractAddress);

function request_minting(yearOfCreation , owner , nameOfExhibit , history){
	var errs=0;
    console.log("request mint: " + yearOfCreation +", " +owner+", "+ nameOfExhibit+ ", "+history);
    var res = async function(){ 
        try{
            return await Contract.methods.requestMintingAnExhibit(yearOfCreation, owner, nameOfExhibit,history).send({from:currentAccount});
        } 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Request for Minting Successful");
			setTimeout(() => {
				window.location.href = "index.html";
			}, 3000);	
    }  
        
    });    
}



Contract.events.exhibitMinted({}, (error, event) => {
    if (error) {
        console.error('Error in exhibitMinted event:', error);
    } else {
        const eventData = event.returnValues.tokenId;
        alert(`EVENT : Exhibit with Token ID ${eventData} has been minted...!!!`);
    }
});

function mint_an_exhibit(requestId){
	var errs=0;
	console.log("Minting Request ID: " + requestId);
    var res = async function(){ 
        try{
			return await Contract.methods.mintMuseumExhibit(requestId).send({from:currentAccount});
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Minting of an exhibit is Successful");
			setTimeout(() => {
				window.location.href = "index.html";
			}, 3000);	
    }  
        
    }); 

}

Contract.events.exhibitKeptOnSale({}, (error) => {
    if (error) {
        console.error('Error in exhibitKeptOnSale event:', error);
    } else {
        alert(`EVENT : Exhibit kept on sale....!!!!!`);
    }
});


function add_exhibit_to_sale(tokenId,price){
	var errs=0;
	console.log("Adding to sale: " + tokenId+", "+price);
    var res = async function(){ 
        try{
            return await Contract.methods.keepExhibitOnSale(tokenId,price).send({from:currentAccount});
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);

		if(errs==0){
			console.log('d');
            alert("Exhibit is added to Sale Successfully");
			setTimeout(() => {
				window.location.href = "index.html";
			}, 5000);	
    } 
    }); 
  
}

function remove_exhibit_from_sale(tokenId){
	var errs=0;
	console.log("Remove from Sale: " + tokenId);
    var res = async function(){ 
        try{
            return await Contract.methods.removeExhibitFromSale(tokenId).send({from:currentAccount});
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Exhibit is successfully removed from Sale");
			setTimeout(() => {
				window.location.href = "index.html";
			}, 5000);	
    } 
    }); 
       
}

function update_exhibit_in_sale(tokenId,updatedprice){
	var errs=0;
    console.log("Update, " + tokenId+", "+updatedprice);
    var res = async function(){ 
        try{
			return await Contract.methods.updateSalePrice(tokenId,updatedprice).send({from:currentAccount});
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Exhibit price is successfully updated");
			setTimeout(() => {
				window.location.href = "index.html";
			}, 5000);	
    } 
    }); 
      
}

function appreciate_exhibit(tokenId,percentage){
	var errs=0;
    console.log("Appreciate, " + tokenId+", "+percentage);
    var res = async function(){ 
        try{
			await Contract.methods.appreciateTokenPrice(tokenId,percentage).send({from:currentAccount});
			const pricee= await Contract.methods.getExhibitPrice(tokenId).call();
			const dis=document.getElementById('display-dd');
			const ele=document.createElement('div');
			ele.innerHTML = ` <p>Updated Price: ${pricee}</p>`;
        	dis.appendChild(ele);
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Exhibit price is appreciated successfully");
    }   
    }); 
      
}



function depreciate_exhibit(tokenId,percentage){
	var errs=0;
    console.log("Depreciate, " + tokenId+", "+percentage);
    var res = async function(){ 
        try{
			await Contract.methods.depriciateTokenPrice(tokenId,percentage).send({from:currentAccount});
			const pricee= await Contract.methods.getExhibitPrice(tokenId).call();
			const dis=document.getElementById('display-d');
			const ele=document.createElement('div');
			ele.innerHTML = ` <p>Updated Price: ${pricee}</p>`;
        	dis.appendChild(ele);
			
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Exhibit price is depreciated successfully");
    }   
    }); 
      
}

function rate_an_exhibit(tokenId,rating){
	var errs=0;
    console.log("Rating: " + tokenId+", "+rating);
    var res = async function(){ 
        try{
            return await Contract.methods.rateAnExhibit(tokenId,rating).send({from:currentAccount});
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Rating an Exhibit is successful");
			setTimeout(() => {
				window.location.href = "index.html";
			}, 5000);
    }        
    }); 
      
}



function check_rate_an_exhibit(tokenId){  
	var errs=0;
    console.log("Get Rating: " + tokenId);
    var res = async function(){ 
        try{
            const totalRatingss=await Contract.methods.getRatingsOfExhibit(tokenId).call();
			const dis=document.getElementById('display-rating');
			const ele=document.createElement('div');
			ele.innerHTML = ` <p>Rating: ${totalRatingss}</p>`;
        	dis.appendChild(ele);
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Checking the Rating of an Exhibit is successful");
    }
       
    }); 
        
}

function view_all_exhibit(){
	var errs=0;
    console.log("View All Exhibits ");
	console.log("current Address: "+currentAccount);
    var res = async function(){ 
        try{
		const allExhibits = await Contract.methods.viewAllExhibits().call();
    	const dis = document.getElementById('exhibits-container');
    	for (const exhibit of allExhibits) {
        	const yearOfCreation = exhibit.yearOfCreation;
       	 	const owner = exhibit.owner;
        	const nameOfExhibit = exhibit.nameOfExhibit;
        	const history = exhibit.history;
        	const ele = document.createElement('div');
			ele.classList.add('exhibit-container');
        	ele.innerHTML = `
            <p>Year of Creation: ${yearOfCreation}</p>
            <p>Owner: ${owner}</p>
            <p>Name of Exhibit: ${nameOfExhibit}</p>
            <p>History: ${history}</p>`;
        	dis.appendChild(ele);
    		}
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Viewing all Exhibits is successful");
			
    }    
    }); 
      
}


function view_all_exhibit_token(){
	var errs=0;
    console.log("View All Exhibits ");
    var res = async function(){ 
        try{
		const allExhibits = await Contract.methods.viewAllExhibits().call();
    	const dis = document.getElementById('exhibits-containersssss');
    	for (const exhibit of allExhibits) {
        	const yearOfCreation = exhibit.yearOfCreation;
       	 	const owner = exhibit.owner;
        	const nameOfExhibit = exhibit.nameOfExhibit;
        	const history = exhibit.history;
        	const ele = document.createElement('div');
			ele.classList.add('exhibit-container');
        	ele.innerHTML = `
            <p>Year of Creation: ${yearOfCreation}</p>
            <p>Owner: ${owner}</p>
            <p>Name of Exhibit: ${nameOfExhibit}</p>
            <p>History: ${history}</p>`;
        	ele.classList.add('exhibit-container');
				const tok = document.createElement('button');
				tok.classList.add('buttons');
				tok.innerHTML = 'TOKEN-ID';
				tok.addEventListener('click', async function() {
				const x= await Contract.methods.getTokenId(yearOfCreation,owner,nameOfExhibit,history).call();
				ele.innerHTML='';
				ele.innerHTML=x;
				});
				const tokcon = document.createElement('div');
				tokcon.classList.add('button-style');
				tokcon.appendChild(tok);

				ele.appendChild(tokcon);
				dis.appendChild(ele);
    		}
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Viewing the Token of an Exhibit is successful");
    } 
        
    }); 
}




function view_all_exhibit_on_sale(){
	var errs=0;
    console.log("View Exhibits on Sale");
    var res = async function(){ 
        try{
			const allExhibits = await Contract.methods.viewAllExhibitsOnSale().call();
			const dis = document.getElementById('exhibits-containers');
			dis.innerHTML = '';
			for (const exhibit of allExhibits) {
				const yearOfCreation = exhibit.yearOfCreation;
				const owner = exhibit.owner;
				const nameOfExhibit = exhibit.nameOfExhibit;
				const history = exhibit.history;
				const tokenss= await Contract.methods.getTokenId(yearOfCreation,owner,nameOfExhibit,history).call();
				const pricee= await Contract.methods.getExhibitPrice(tokenss).call();
				const ele = document.createElement('div');
				ele.innerHTML = `
					<p>Year of Creation: ${yearOfCreation}</p>
					<p>Owner: ${owner}</p>
					<p>Name of Exhibit: ${nameOfExhibit}</p>
					<p>History: ${history}</p>
					<p>Price: ${pricee}</p>
					<p>Token ID: ${tokenss}</p>`;
				ele.classList.add('exhibit-container');
				const buy = document.createElement('button');
				buy.classList.add('buttons');
				buy.innerHTML = 'BUY';
				buy.addEventListener('click', async function() {
				buy_an_exhibit(tokenss,pricee);
				});
				const buttoncon = document.createElement('div');
				buttoncon.classList.add('button-style');
				buttoncon.appendChild(buy);

				ele.appendChild(buttoncon);
				dis.appendChild(ele);
			}
		} 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Viewing all Exhibits on sale is successful");
    } 
        
    }); 
   
}

function view_my_requests(){
	var errs=0;
    console.log("View My Requests");
    var res = async function(){ 
        try{
			const allExhibits = await Contract.methods.getUnMintedExhibitDetails().call();
    const dis = document.getElementById('exhibits-containerss');
	dis.innerHTML = '';
    for (let i = 0; i < allExhibits.length; i++) {
        const yearOfCreation = allExhibits[i].yearOfCreations;
        const owner = allExhibits[i].owners;
        const nameOfExhibit = allExhibits[i].nameOfExhibits;
        const history = allExhibits[i].historys;
        const ele = document.createElement('div');
        ele.innerHTML = `
            <p>Year of Creation: ${yearOfCreation}</p>
            <p>Owner: ${owner}</p>
            <p>Name of Exhibit: ${nameOfExhibit}</p>
            <p>History: ${history}</p>`;
			ele.classList.add('exhibit-container');
		const x=await Contract.methods.getRequestId(yearOfCreation,owner,nameOfExhibit,history).call();
		console.log(x);
		const mint = document.createElement('button');
        mint.innerHTML = 'MINT';
        mint.classList.add('buttons');
		mint.addEventListener('click', async function() {
            mint_an_exhibit(x);
        });
		const buttoncon = document.createElement('div');
		buttoncon.classList.add('button-style');
		buttoncon.appendChild(mint);
		ele.appendChild(buttoncon);
        dis.appendChild(ele);
		} 
	}
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Viewing of all Requests is successful");
    }     
        
    }); 
    
}


Contract.events.exhibitSold({}, (error, event) => {
    if (error) {
        console.error('Error in buyAnExhibit event:', error);
    } else {
        const eventData = event.returnValues.tokenId;
        alert(`EVENT : Exhibit with Token ID ${eventData} has been sold...!!!`);
    }
});

function buy_an_exhibit(tokenss,pricee){
	var errs=0;
	console.log("Buy, " + tokenss+", "+pricee);
	var res = async function(){ 
        try{
			return await Contract.methods.buyAnExhibit(tokenss).send({from:currentAccount,value: pricee});

        } 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Purchase of an Exhibit is Successful");
			setTimeout(() => {
				window.location.href = "sale.html";
			}, 5000);
    }  
    });    
}



function get_details_of_an_exhibit(tokenId){ 
	var errs=0;
    console.log("Getting details of an exhibit: "+tokenId);
    var res = async function(){ 
        try{
			const anExhibit = await Contract.methods.getExhibitDetails(tokenId).call();
    		const details = document.getElementById('display-r');
        	const yearOfCreation = anExhibit.yearOfCreation;
        	const owner = anExhibit.owner;
        	const nameOfExhibit = anExhibit.nameOfExhibit;
        	const history = anExhibit.history;
        	const element = document.createElement('div');
        	element.innerHTML = `
            <p>Year of Creation: ${yearOfCreation}</p>
            <p>Owner: ${owner}</p>
            <p>Name of Exhibit: ${nameOfExhibit}</p>
            <p>History: ${history}</p>`;
        	details.appendChild(element);
        } 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Getting all details of an Exhibit is Successful");
    }  
    });  
}

function get_owners_of_an_exhibit(tokenId){
	var errs=0;
    console.log("Viewing all owners");
    var res = async function(){ 
        try{
				const ownerExhibit = await Contract.methods.listAllOwners(tokenId).call();
				console.log("Owner Exhibit Array:", ownerExhibit);
				const container = document.getElementById('display-o');
				container.innerHTML = '';
				ownerExhibit.forEach((item, index) => {
					const ele = document.createElement('div');
					ele.innerHTML = `<p>Owner ${index + 1}: ${item}</p>`;
					container.appendChild(ele);
				});
            
        } 
        catch(err){
            console.log(err);
			errs=1;
            alert("Transaction failed due to an error.");
        }
    }
	res().then((val)=>{
        console.log(val);
		if(errs==0){
            alert("Getting all owners of an Exhibit is Successful");
    }  
    });
}



























