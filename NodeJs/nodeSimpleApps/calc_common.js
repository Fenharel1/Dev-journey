const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your simple equation: ", (input) => {
  if (input === "quit") rl.close();
  else {
    try {
      const value = eval(input);
      console.log(`Result: ${value}`);
    } catch (exception) {
      console.log("I don't know how to do that.");
    }
    rl.close();
  }
});
