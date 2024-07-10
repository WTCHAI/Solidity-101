import { expect } from "chai";
import hh from "hardhat"

// console.log(hh)

describe('Token contract tester', () => { 

    const TokenDeployment = async ()=>{
        const Contract = await hh.ethers.getContractFactory("Token"); 
        const owner = await hh.ethers.getSigners() ;
        const TokenContract  = await Contract.deploy() ; 
        return { TokenContract , owner } ; 
    }

    it('Should deploy the contract correctly', async () => {
        const { TokenContract , owner } = await TokenDeployment() ; 
        //Check case that contract address is not empthy string 
        expect(TokenContract.getAddress).to.not.equal('') ;
        //Check case that contract address is not null 
        expect(owner).to.not.equal(TokenContract.owner()) ;
        console.log(await TokenContract.getAddress()) ;
    });

})
