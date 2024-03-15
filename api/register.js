const { Client } = require('@vercel/postgres');

// Create a PostgreSQL client instance
const client = new Client({
  connectionString: "postgres://default:************@ep-mute-pine-a26tupy0.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require" // Replace with your connection string
});

// Function to register a new user
async function registerUser(name, email, password) {
  await client.connect(); // Connect to the database

  // Insert a new user record into the database
  await client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);

  await client.end(); // Disconnect from the database
}

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Register the new user
    await registerUser(name, email, password);

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};