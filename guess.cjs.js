const readline = require('readline');

const Guess = () => {
    return new Promise(resolve => {    
        const rl = readline.createInterface({
            input:  process.stdin,
            output: process.stdout
        });
        rl.question("What do you think is the number? (Coins at stake)\n ", (userGuess) => {
            resolve(userGuess);
            console.log(`Loading...\n`);
            rl.close();
        });
    });   
}

const getStakeAmount = (accountBalance) => {
    return new Promise(resolve => {    
        const rl = readline.createInterface({
            input:  process.stdin,
            output: process.stdout
        });
        rl.question(`What is the amount you want to stake? (max: 4)\n Curret amount balance: ${accountBalance}: `, (stakeAmount) => {
            resolve(stakeAmount);
            console.log(`You need to pay ${stakeAmount} before proceeding\n`);
            rl.close();
        });
    });   
}

module.exports.Guess = Guess;
module.exports.getStakeAmount = getStakeAmount;