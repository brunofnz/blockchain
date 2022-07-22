const Block = require('./block');
const SHA256 = require('crypto-js/sha256')

class Blockchain {
    constructor() {
        this.chain = [];
        this.height = - 1;
        this.initializeChain();
    }
    async initializeChain(){
        if(this.height) {
            const block = new Block({
                data: 'Genesis Block'
            });
            await this.addBlock(block);
        }
    }

    addBlock(block) {
        let self = this;
        return new Promise(async (resolve,reject)=>{
            block.height = self.chain.length;
            block.time = new Date().getTime.toString()

            if(self.chain.length > 0){
                block.previousBlockHash = self.chain[self.chain.length - 1].hash
            }

            let errors = await self.validateChain();
            if (errors.length > 0) {
                reject(new Error('The chain is not valid: ',errors));
            }

            block.hash = SHA256(JSON.stringify(block)).toString();
            self.chain.push(block);
            resolve(block);
        });
    }

    validateChain() {
        let self = this;
        const errors = [];
        return new Promise( async (resolve,reject)=>{
            self.chain.map( async (block) => {
                try {
                    let isValid = await block.valiate();
                    if (!isValid) {
                        errors.push(new Error(`The block ${block.height} is not valid.`))
                    }
                } catch (error) {
                    errors.push(error);
                }
            });
            resolve(errors);         
        });
    }

    print() {
        let self = this;
        for (let block of self.chain){
            console.log(block.toString());
        }
    }
}

module.exports = Blockchain;