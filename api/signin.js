const { Client } = require('@vercel/postgres');

// Create a PostgreSQL client instance
const client = new Client({
  connectionString: "postgres://default:************@ep-mute-pine-a26tupy0.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require" // Replace with your connection string
});

// Function to authenticate user
async function authenticateUser(email, password) {
  await client.connect(); // Connect to the database

  // Query the database to check if the user exists and the password matches
  const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

  await client.end(); // Disconnect from the database

  return result.rows.length > 0; // Return true if user exists and password matches, false otherwise
}

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user
    const isAuthenticated = await authenticateUser(email, password);

    if (isAuthenticated) {
      res.status(200).json({ success: true, message: 'User authenticated' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};