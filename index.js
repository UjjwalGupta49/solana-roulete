const {
  transferSOL,
  getWalletBalance,
  airDropSol,
  userWallet,
  toWallet,
  toPubKey,
} = require("./SolanaLogic.cjs.js");
//const {airDropSol} = require("./AirDrop.cjs.js");
// const { userWallet, toWallet, toPubKey } = require("./wallets.cjs.js");
const { randomArray, randomElement } = require("./randomArray.cjs.js");
const { Guess, getStakeAmount } = require("./Guess.cjs.js");

// fixed ration of 1:2 (gain)
// incorrect guess lost (half)

let stakeAmount = 0;
let userGuess = 0;
let accountBalance = 0;

async function getAmount(accountBalance) {
  stakeAmount = await getStakeAmount(accountBalance);
}

// transaction;

// random number list

async function getGuess() {
  userGuess = await Guess();
}

async function walletBalanceUser() {
  accountBalance = await getWalletBalance(userWallet.publicKey);
  return accountBalance;
}

// guess check and reward
const checkAndReward = async () => {
  if (userGuess == randomElement) {
    console.log(`Congratulations, Right guess\nYou get ${2 * stakeAmount} SOL`);

    const iterations = Math.floor(
      (2 * stakeAmount - getWalletBalance(toWallet.publicKey)) / 2
    );

    for (let k = 0; k <= iterations; k++) {
      await airDropSol(toWallet.publicKey);
    }

    await transferSOL(toWallet, userWallet, 2 * stakeAmount);
    console.log(`Amount ${2 * stakeAmount} sucessfully transferd!!`);
  } else {
    console.log("Incorrect guess!\n");
    await transferSOL(toWallet, userWallet, 0.5 * stakeAmount);
    console.log("Half of stake amount transferd");
  }
};

async function main() {
  await walletBalanceUser();
  await getAmount(accountBalance);
  await transferSOL(userWallet, toWallet, stakeAmount);
  console.log(`You will get ${2 * stakeAmount} SOL if won\n`);
  console.log("time to guess\n");
  console.log(
    "---------------------------------------------------------------------------------------------------------------------"
  );
  console.log(randomArray);
  await getGuess();
  await checkAndReward();
  await walletBalanceUser();
}

main();
