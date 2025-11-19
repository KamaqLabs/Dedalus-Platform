#!/bin/sh
set -e

# Wait for MySQL to be ready (essential!)
echo "🔌 Checking database connection at ${DB_HOST}:${DB_PORT}..."
node <<EOF
const net = require('net');
const timeout = 30000; // 30 seconds timeout

const checkDatabase = () => new Promise((resolve, reject) => {
  const socket = net.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT)
  });

  socket.setTimeout(2000);

  socket.on('connect', () => {
    socket.end();
    resolve();
  });

  socket.on('timeout', () => {
    socket.destroy();
    reject(new Error('Connection timed out'));
  });

  socket.on('error', (err) => {
    reject(err);
  });
});

const start = Date.now();
const attemptConnection = async () => {
  try {
    await checkDatabase();
    console.log("✅ Database connection successful");
  } catch (err) {
    if (Date.now() - start > timeout) {
      console.error("❌ Database connection timed out after 30 seconds");
      process.exit(1);
    }
    console.log("⌛ Database not ready, retrying in 2 seconds...");
    await new Promise(res => setTimeout(res, 2000));
    await attemptConnection();
  }
};

attemptConnection();
EOF


# Run migrations against PRODUCTION database
npm run migration:run:prod
# Start application
exec npm run start:prod