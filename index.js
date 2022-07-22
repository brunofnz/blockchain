const Blockchain = require('./src/blockchain')
const Block = require('./src/block')

async function run() {
    const blockchain = new Blockchain();
    const block1 = new Block();
    const block2 = new Block();
    const block3 = new Block();

    await blockchain.addBlock(block1)
    await blockchain.addBlock(block2)
    await blockchain.addBlock(block3)

    blockchain.print();
}

run()