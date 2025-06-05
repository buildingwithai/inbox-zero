// Load environment variables from .env and .env.local
const path = require('path');
const dotenv = require('dotenv');

// Only load .env files if not in a Vercel deployment environment
// Vercel provides its own environment variables directly via process.env.
if (!process.env.VERCEL_ENV) {
  console.log('Local environment detected. Loading .env files...');
  // Load .env file from the parent directory (apps/web/.env)
  dotenv.config({ path: path.resolve(__dirname, '../.env') });

  // Load .env.local file from the parent directory (apps/web/.env.local), overriding .env if variables conflict
  dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true });
} else {
  console.log(`Vercel environment detected: ${process.env.VERCEL_ENV}. Skipping .env file loading.`);
}

// Check if required environment variables are set
const requiredVars = [
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING'
];

console.log('=== Checking Environment Variables ===');
let allVarsPresent = true;

requiredVars.forEach(variable => {
  if (!process.env[variable]) {
    console.error(`❌ Missing: ${variable}`);
    allVarsPresent = false;
  } else {
    console.log(`✅ Found: ${variable}`);
    // Log first 10 chars of the value for verification (without exposing full credentials)
    console.log(`   Value: ${String(process.env[variable]).substring(0, 10)}...`);
  }
});

if (!allVarsPresent) {
  console.error('\n❌ Missing required environment variables');
  process.exit(1);
}

console.log('\n✅ All required environment variables are present');
