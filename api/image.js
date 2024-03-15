const { Client } = require('@vercel/postgres');

// Create a PostgreSQL client instance
const client = new Client({
  connectionString: "postgres://default:************@ep-mute-pine-a26tupy0.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require" // Replace with your connection string
});

// Function to update user entries based on image submission
async function updateUserEntries(id) {
  await client.connect(); // Connect to the database

  // Example: Update user entries in the database
  await client.query('UPDATE users SET entries = entries + 1 WHERE id = $1', [id]);

  await client.end(); // Disconnect from the database
}

module.exports = async (req, res) => {
  try {
    const { id } = req.body;

    // Update user entries based on image submission
    await updateUserEntries(id);

    res.status(200).json({ success: true, message: 'User entries updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};