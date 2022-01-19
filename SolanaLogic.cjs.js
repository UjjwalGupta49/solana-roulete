const web3 = require("@solana/web3.js");

// connection mthode is used to establish the connection

const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);

// // converting secrect key to Unit8 array

const fromsecretKey = [
  6, 193, 68, 127, 121, 67, 41, 212, 183, 4, 42, 53, 232, 79, 229, 36, 210, 151,
  19, 44, 3, 114, 233, 194, 83, 192, 162, 151, 76, 90, 146, 170, 22, 106, 37,
  155, 247, 219, 140, 75, 62, 126, 29, 234, 176, 99, 251, 157, 22, 38, 199, 179,
  33, 73, 117, 21, 74, 42, 39, 222, 127, 89, 243, 5,
];

const toSecrectKey = [
  81, 183, 193, 128, 227, 183, 81, 17, 249, 155, 225, 194, 60, 84, 158, 188,
  137, 196, 49, 128, 25, 10, 14, 104, 5, 99, 77, 160, 99, 209, 156, 152, 64,
  255, 112, 6, 242, 210, 49, 156, 65, 11, 169, 178, 199, 194, 75, 115, 96, 123,
  233, 66, 120, 34, 102, 252, 144, 170, 95, 17, 89, 238, 225, 59,
];
const userWallet = web3.Keypair.fromSecretKey(
  Uint8Array.from(fromsecretKey)
);
const toWallet = web3.Keypair.fromSecretKey(
  Uint8Array.from(toSecrectKey)
);

const userPubKey = new web3.PublicKey(userWallet.publicKey);
const toPubkey = new web3.PublicKey(toWallet.publicKey);

const getWalletBalance = async (pubKey) => {
  try {
    const walletBalance = await connection.getBalance(new web3.PublicKey(pubKey), "confirmed"); //Gets the balance of the wallet.
    // console.log(`Wallet balance: ${walletBalance}`);
    // console.log(`PublicKey ${pubKey}`);
    const walletBalanceSOL = (
      `Wallet balance: ${parseInt(walletBalance) / web3.LAMPORTS_PER_SOL} SOL`
    );
    return walletBalanceSOL;
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async (pubKey) => {
  // air drop function
  try {
    console.log("Air dropping... 2 SOL");
    const fromAirDropSignature = await connection.requestAirdrop(
      pubKey,
      2 * web3.LAMPORTS_PER_SOL // max airdrop at max 2 SOL in one transaction
    );
    await connection.confirmTransaction(fromAirDropSignature);
    //console.log("Drop successful!");
  } catch (err) {
    console.log(err);
  }
};

const transferSOL = async (from, to, transferAmt) => {
  // takes from public key, to pubbic key, transfer amount | transers SOL from one wallet to another
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const transaction = new web3.Transaction({ feePayer: from.publicKey }).add(
      web3.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to.publicKey,
        lamports: transferAmt * web3.LAMPORTS_PER_SOL,
      })
    );

    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );
    console.log(`Transfer successful!`);
    return signature;
  } catch (err) {
    console.log(err);
  }
};

// const allFunc = async () => {
//   await getWalletBalance(userPubKey);
//   await airDropSol();
//   await getWalletBalance(userPubKey);
//   await transferSOL(userPubKey, toPubkey, 0.2);
//   await getWalletBalance(userPubKey);
//   await getWalletBalance(toPubkey);
// };

// allFunc();

// export default { transferSOL, getWalletBalance, airDropSol };

module.exports.userWallet =  userWallet;
module.exports.toWallet =  toWallet;
module.exports.userPubKey =  userPubKey;
module.exports.toPubkey =  toPubkey;
module.exports.getWalletBalance = getWalletBalance;
module.exports.airDropSol = airDropSol;
module.exports.transferSOL =  transferSOL;


