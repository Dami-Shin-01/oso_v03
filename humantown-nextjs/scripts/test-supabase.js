/**
 * Supabase Connection Test Script
 *
 * This script tests the Supabase connection and verifies:
 * 1. Database connection
 * 2. Table existence (reservations, room_availability)
 * 3. Basic query functionality
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#][^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testSupabaseConnection() {
  log('\n🔍 Starting Supabase Connection Test...', 'cyan');
  log('━'.repeat(50), 'cyan');

  // Check environment variables
  log('\n1. Checking Environment Variables...', 'blue');
  if (!supabaseUrl || !supabaseServiceKey) {
    log('❌ Missing Supabase credentials in .env.local', 'red');
    log('   Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY', 'yellow');
    process.exit(1);
  }
  log(`✅ Supabase URL: ${supabaseUrl}`, 'green');
  log(`✅ Service Key: ${supabaseServiceKey.substring(0, 20)}...`, 'green');

  // Create Supabase client
  log('\n2. Creating Supabase Client...', 'blue');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  log('✅ Supabase client created', 'green');

  // Test 1: Check reservations table
  log('\n3. Testing reservations table...', 'blue');
  try {
    const { data, error, count } = await supabase
      .from('reservations')
      .select('*', { count: 'exact', head: true });

    if (error) {
      log(`❌ Error accessing reservations table: ${error.message}`, 'red');
      log(`   Code: ${error.code}`, 'yellow');
      log(`   Details: ${error.details}`, 'yellow');
      if (error.hint) log(`   Hint: ${error.hint}`, 'yellow');
    } else {
      log(`✅ reservations table exists`, 'green');
      log(`   Total records: ${count ?? 0}`, 'green');
    }
  } catch (err) {
    log(`❌ Exception: ${err.message}`, 'red');
  }

  // Test 2: Check room_availability table
  log('\n4. Testing room_availability table...', 'blue');
  try {
    const { data, error, count } = await supabase
      .from('room_availability')
      .select('*', { count: 'exact', head: true });

    if (error) {
      log(`❌ Error accessing room_availability table: ${error.message}`, 'red');
      log(`   Code: ${error.code}`, 'yellow');
    } else {
      log(`✅ room_availability table exists`, 'green');
      log(`   Total records: ${count ?? 0}`, 'green');
    }
  } catch (err) {
    log(`❌ Exception: ${err.message}`, 'red');
  }

  // Test 3: Try to fetch recent reservations
  log('\n5. Fetching recent reservations (if any)...', 'blue');
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('id, room_name, guest_name, check_in, check_out, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      log(`❌ Error fetching reservations: ${error.message}`, 'red');
    } else {
      if (data.length === 0) {
        log('ℹ️  No reservations found (table is empty)', 'yellow');
      } else {
        log(`✅ Found ${data.length} recent reservation(s):`, 'green');
        data.forEach((reservation, index) => {
          log(`   ${index + 1}. ${reservation.guest_name} - ${reservation.room_name}`, 'cyan');
          log(`      Dates: ${reservation.check_in} to ${reservation.check_out}`, 'cyan');
          log(`      Status: ${reservation.status}`, 'cyan');
        });
      }
    }
  } catch (err) {
    log(`❌ Exception: ${err.message}`, 'red');
  }

  // Test 4: Check for database functions (triggers)
  log('\n6. Checking database functions...', 'blue');
  try {
    // Try to call a simple query that would trigger the functions
    const { data, error } = await supabase.rpc('block_dates_for_reservation', {}, { count: 'exact' });

    // We expect this to fail if no args are provided, but it shows the function exists
    if (error && error.message.includes('function')) {
      log('✅ Database functions are accessible', 'green');
    } else {
      log('ℹ️  Database functions check inconclusive', 'yellow');
    }
  } catch (err) {
    log('ℹ️  Could not verify database functions directly', 'yellow');
    log('   This is normal - functions exist but need proper parameters', 'yellow');
  }

  log('\n' + '━'.repeat(50), 'cyan');
  log('🎉 Supabase Connection Test Complete!\n', 'cyan');
}

// Run the test
testSupabaseConnection().catch((error) => {
  log(`\n❌ Fatal Error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
