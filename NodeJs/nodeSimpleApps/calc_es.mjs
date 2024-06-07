import * as readline from "readline";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

function question2(query) {
  return new Promise(resolve => {
    rl.question(query, resolve)
  });
}

let answer = await question2("Enter your simple equation: ");

while (answer != "quit") {
  try {
    const value = eval(answer);
    console.log(`Result: ${value}`);
  } catch (exception) {
    console.log("I don't know how to do that.");
  }
  answer = await question2('Enter your simple equation: ')
}

rl.close();


function question() {
  rl.question("Enter your simple equation: ", (input) => {
    if (input === "quit") rl.close();
    else {
      try {
        const value = eval(input);
        console.log(`Result: ${value}`);
      } catch (exception) {
        console.log("I don't know how to do that.");
      }
      question();
    }
  });
}