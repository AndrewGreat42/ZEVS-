CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE employees (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN','RECEPTIONIST')),
  active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE rooms (
  id BIGSERIAL PRIMARY KEY,
  number VARCHAR(16) NOT NULL UNIQUE,
  category VARCHAR(40) NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity >= 1),
  price_per_night NUMERIC(12,2) NOT NULL CHECK (price_per_night > 0),
  active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(160)
);
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  guest_id BIGINT NOT NULL REFERENCES guests(id) ON DELETE RESTRICT,
  created_by BIGINT REFERENCES employees(id) ON DELETE RESTRICT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING','CONFIRMED','CANCELLED','CHECKED_IN','CHECKED_OUT')),
  nightly_rate NUMERIC(12,2) NOT NULL CHECK (nightly_rate > 0),
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_dates CHECK (check_out > check_in),
  CONSTRAINT no_overlapping_bookings EXCLUDE USING gist (
    room_id WITH =,
    daterange(check_in, check_out, '[)') WITH &&
  ) WHERE (status <> 'CANCELLED')
);
CREATE INDEX idx_bookings_dates ON bookings(check_in,check_out);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_guests_name ON guests(full_name);
