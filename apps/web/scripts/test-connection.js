const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('🔍 Testing database connection...');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    // Test connection by querying the database version
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database connection successful!');
    console.log('📊 Database version:', result[0].version);
    
    // Test if we can query a table
    try {
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log('\n📋 Available tables:');
      console.log(tables.map(t => `- ${t.table_name}`).join('\n'));
    } catch (tableError) {
      console.warn('⚠️ Could not list tables (this might be normal if no tables exist yet)');
      console.warn('Error:', tableError.message);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error details:', error.message);
    
    // More detailed error information
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.meta) {
      console.error('Error meta:', JSON.stringify(error.meta, null, 2));
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
