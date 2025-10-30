-- OSO Camping BBQ Reservation System Database Schema
-- Created: 2025-10-30

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table: reservations
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Room information
  room_id VARCHAR(50) NOT NULL,
  room_name VARCHAR(100) NOT NULL,

  -- Guest information
  guest_name VARCHAR(100) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(20) NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),

  -- Reservation dates
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER GENERATED ALWAYS AS (check_out - check_in) STORED,

  -- Pricing
  price_per_night INTEGER NOT NULL,
  total_price INTEGER NOT NULL,

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),

  -- Additional information
  special_requests TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Constraints
  CONSTRAINT check_dates CHECK (check_out > check_in),
  CONSTRAINT check_nights CHECK (nights >= 1)
);

-- ============================================
-- Table: room_availability
-- ============================================
CREATE TABLE IF NOT EXISTS room_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Room information
  room_id VARCHAR(50) NOT NULL,

  -- Date
  date DATE NOT NULL,

  -- Availability
  available BOOLEAN NOT NULL DEFAULT true,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Unique constraint: one record per room per date
  CONSTRAINT unique_room_date UNIQUE (room_id, date)
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_reservations_room_id ON reservations(room_id);
CREATE INDEX idx_reservations_check_in ON reservations(check_in);
CREATE INDEX idx_reservations_check_out ON reservations(check_out);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_guest_email ON reservations(guest_email);
CREATE INDEX idx_reservations_created_at ON reservations(created_at);

CREATE INDEX idx_room_availability_room_id ON room_availability(room_id);
CREATE INDEX idx_room_availability_date ON room_availability(date);
CREATE INDEX idx_room_availability_available ON room_availability(available);

-- ============================================
-- Functions
-- ============================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger: Auto-update updated_at for reservations
CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for room_availability
CREATE TRIGGER update_room_availability_updated_at BEFORE UPDATE ON room_availability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Block dates when reservation is created/confirmed
CREATE OR REPLACE FUNCTION block_dates_for_reservation()
RETURNS TRIGGER AS $$
BEGIN
  -- Only block dates for confirmed or pending reservations
  IF NEW.status IN ('pending', 'confirmed') THEN
    -- Insert unavailable dates for each night of the reservation
    INSERT INTO room_availability (room_id, date, available)
    SELECT NEW.room_id, generate_series(NEW.check_in, NEW.check_out - INTERVAL '1 day', INTERVAL '1 day')::DATE, false
    ON CONFLICT (room_id, date)
    DO UPDATE SET available = false;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-block dates when reservation is created
CREATE TRIGGER auto_block_dates AFTER INSERT OR UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION block_dates_for_reservation();

-- Function: Unblock dates when reservation is cancelled
CREATE OR REPLACE FUNCTION unblock_dates_for_cancelled_reservation()
RETURNS TRIGGER AS $$
BEGIN
  -- Unblock dates if reservation is cancelled
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    DELETE FROM room_availability
    WHERE room_id = NEW.room_id
      AND date >= NEW.check_in
      AND date < NEW.check_out;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-unblock dates when reservation is cancelled
CREATE TRIGGER auto_unblock_dates AFTER UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION unblock_dates_for_cancelled_reservation();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_availability ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reservations (for admin dashboard - can be restricted later)
CREATE POLICY "Allow read access to reservations" ON reservations
  FOR SELECT USING (true);

-- Policy: Anyone can create reservations
CREATE POLICY "Allow insert access to reservations" ON reservations
  FOR INSERT WITH CHECK (true);

-- Policy: Anyone can update their own reservation (by email)
CREATE POLICY "Allow update access to own reservations" ON reservations
  FOR UPDATE USING (guest_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Anyone can read room availability
CREATE POLICY "Allow read access to room_availability" ON room_availability
  FOR SELECT USING (true);

-- Policy: Only service role can modify room_availability (triggers handle this)
CREATE POLICY "Allow service role to modify room_availability" ON room_availability
  FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- Insert sample room availability (next 90 days, all available)
-- This is optional - the trigger will handle blocking automatically
-- Uncomment if you want to pre-populate availability

/*
INSERT INTO room_availability (room_id, date, available)
SELECT
  room_id,
  generate_series(
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '90 days',
    INTERVAL '1 day'
  )::DATE as date,
  true as available
FROM (
  VALUES
    ('private-01'), ('private-02'), ('private-03'),
    ('private-04'), ('private-05'), ('vip-01')
) AS rooms(room_id)
ON CONFLICT (room_id, date) DO NOTHING;
*/

-- ============================================
-- Helpful Queries
-- ============================================

-- Check availability for a room in a date range
-- SELECT date, available FROM room_availability
-- WHERE room_id = 'private-01'
--   AND date >= '2025-11-01'
--   AND date <= '2025-11-30'
-- ORDER BY date;

-- Get all reservations for a specific room
-- SELECT * FROM reservations
-- WHERE room_id = 'private-01'
--   AND status != 'cancelled'
-- ORDER BY check_in;

-- Get upcoming reservations
-- SELECT * FROM reservations
-- WHERE check_in >= CURRENT_DATE
--   AND status IN ('pending', 'confirmed')
-- ORDER BY check_in;
