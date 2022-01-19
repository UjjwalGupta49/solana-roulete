const random = require("random");
const randomNums = [];

for (let i = 0; i <= 5; i++) {
  const a = random.int(0, 50);
  const b = random.int(60, 300);

  const num = random.int(a, b);
  randomNums.push(num);
};

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};

module.exports.randomArray =  shuffle(randomNums);

num =  random.int(0,4)
module.exports.randomElement = randomNums[num]; 

// export default {randomArray, randomElement};