
const hre = require("hardhat");

const deploy = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  console.log(transactions);

  //await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address)

  console.log("Transactions deployed to:", transactions.target)
};

const runDeploy = async () => {
  try {
    await deploy();
    //成功
    process.exit(0);
  } catch (err) {
    console.log(err);
    //失敗
    process.exit(1);
  }
};

runDeploy();

/*async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});*/
