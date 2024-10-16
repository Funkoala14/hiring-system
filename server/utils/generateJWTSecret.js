import { randomBytes } from 'crypto';

// Function to generate a random  number
function generateRandomNumber() {
    const buffer = randomBytes(64);

    // Convert the random bytes to a hex
    const randomNumber = buffer.toString('hex');

    return randomNumber;
}

// Usage
const randomNumber = generateRandomNumber();
console.log(`Random number: ${randomNumber}`);
