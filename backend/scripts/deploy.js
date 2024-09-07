async function main() {
    const MyContract = await ethers.getContractFactory("VotexChain");
    const myContractInstance = await MyContract.deploy();

    // await myContractInstance.deployed();

    console.log("MyContract deployed to:", myContractInstance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
