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
