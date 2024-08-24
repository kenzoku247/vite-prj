const crypto = require('crypto');

// Function to generate a complex random string
function generateSecretKey(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let secretKey = '';

    // Generate random bytes and use them to index into the character set
    const bytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        // Use the byte value to select a character from the chars array
        const index = bytes[i] % chars.length;
        secretKey += chars[index];
    }

    return secretKey;
}

// Generate a secret key of desired length
const secretKey = generateSecretKey(64); // You can change the length as needed

console.log("Generated Complex Secret Key:", secretKey);
