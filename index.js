// Import the mainMenu function from the inquirer module
const { mainMenu } = require('./src/utils/inquirer');

// Define an asynchronous function to run the application
async function run() {
  try {
    // Call the mainMenu function and wait for it to complete
    await mainMenu();
  } catch (error) {
    // If an error occurs, log it to the console
    console.error('An error occurred:', error);
  }
}

// Call the run function to start the application
run();