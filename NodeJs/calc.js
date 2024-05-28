process.stdin.on('data', (chunk) => {
  const input = chunk.toString().trim()

  if(input === 'quit') process.exit(0);

  try{
    const value = eval(input);
    console.log(`Result: ${value}`)
  }catch(exception){
    console.log("I don't know how to do that.")
  }
  process.stdout.write("Enter your simple equation: ")

})

process.stdout.write('Enter a number: ');