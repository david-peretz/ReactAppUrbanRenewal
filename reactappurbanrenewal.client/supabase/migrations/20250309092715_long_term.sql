/*
  # Initial Schema for Urban Renewal Management System

  1. New Tables
    - users
    - projects
    - tenders
    - tender_applications
    - properties
    - property_valuations
    - documents
    - meetings
    - reports

  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on user roles
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('developer', 'lawyer', 'appraiser', 'financialAdvisor', 'professional', 'resident', 'localAuthority', 'governmentOffice')),
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  location text NOT NULL,
  status text NOT NULL CHECK (status IN ('planning', 'approval', 'construction', 'completed')),
  type text NOT NULL CHECK (type IN ('tama38', 'pinuiBinui', 'urbanRenewalOther')),
  owner_id uuid REFERENCES users(id),
  units_total integer NOT NULL,
  units_sold integer DEFAULT 0,
  budget numeric(12,2),
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tenders table
CREATE TABLE IF NOT EXISTS tenders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  publisher_id uuid REFERENCES users(id),
  status text NOT NULL CHECK (status IN ('draft', 'open', 'closed', 'awarded')),
  type text NOT NULL CHECK (type IN ('tama38', 'pinuiBinui', 'urbanRenewalOther')),
  budget numeric(12,2),
  location text NOT NULL,
  deadline timestamptz NOT NULL,
  requirements text[],
  created_at timestamptz DEFAULT now()
);

-- Tender applications table
CREATE TABLE IF NOT EXISTS tender_applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tender_id uuid REFERENCES tenders(id),
  applicant_id uuid REFERENCES users(id),
  status text NOT NULL CHECK (status IN ('draft', 'submitted', 'underReview', 'accepted', 'rejected')),
  company_name text NOT NULL,
  proposal text,
  submitted_at timestamptz DEFAULT now()
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('residential', 'commercial', 'industrial', 'land')),
  size numeric(10,2) NOT NULL,
  units integer,
  status text NOT NULL CHECK (status IN ('available', 'underConstruction', 'sold', 'rented')),
  owner_id uuid REFERENCES users(id),
  project_id uuid REFERENCES projects(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Property valuations table
CREATE TABLE IF NOT EXISTS property_valuations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  appraiser_id uuid REFERENCES users(id),
  value numeric(12,2) NOT NULL,
  date date NOT NULL,
  method text NOT NULL CHECK (method IN ('comparable', 'income', 'cost', 'development')),
  factors jsonb NOT NULL,
  comparables jsonb,
  notes text,
  status text NOT NULL CHECK (status IN ('draft', 'completed', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  owner_id uuid REFERENCES users(id),
  project_id uuid REFERENCES projects(id),
  property_id uuid REFERENCES properties(id),
  tender_id uuid REFERENCES tenders(id),
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  time time NOT NULL,
  location text NOT NULL,
  organizer_id uuid REFERENCES users(id),
  project_id uuid REFERENCES projects(id),
  property_id uuid REFERENCES properties(id),
  attendees uuid[] NOT NULL,
  status text NOT NULL CHECK (status IN ('scheduled', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('financial', 'progress', 'valuation', 'sales', 'custom')),
  data jsonb NOT NULL,
  creator_id uuid REFERENCES users(id),
  project_id uuid REFERENCES projects(id),
  property_id uuid REFERENCES properties(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tender_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_valuations ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Project policies
CREATE POLICY "Users can read projects they own or are involved in" ON projects
  FOR SELECT TO authenticated
  USING (
    owner_id = auth.uid() OR
    auth.uid() IN (
      SELECT user_id FROM project_members WHERE project_id = id
    )
  );

-- Tender policies
CREATE POLICY "Anyone can read open tenders" ON tenders
  FOR SELECT TO authenticated
  USING (status = 'open');

CREATE POLICY "Publishers can manage their tenders" ON tenders
  USING (publisher_id = auth.uid());

-- Application policies
CREATE POLICY "Users can read and manage their own applications" ON tender_applications
  FOR ALL TO authenticated
  USING (applicant_id = auth.uid());

CREATE POLICY "Publishers can read applications for their tenders" ON tender_applications
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (
      SELECT publisher_id FROM tenders WHERE id = tender_id
    )
  );

-- Property policies
CREATE POLICY "Users can read properties they own or have access to" ON properties
  FOR SELECT TO authenticated
  USING (
    owner_id = auth.uid() OR
    auth.uid() IN (
      SELECT user_id FROM property_access WHERE property_id = id
    )
  );

-- Valuation policies
CREATE POLICY "Appraisers can manage their valuations" ON property_valuations
  FOR ALL TO authenticated
  USING (appraiser_id = auth.uid());

CREATE POLICY "Property owners can read valuations" ON property_valuations
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (
      SELECT owner_id FROM properties WHERE id = property_id
    )
  );

-- Document policies
CREATE POLICY "Users can read and manage their documents" ON documents
  FOR ALL TO authenticated
  USING (owner_id = auth.uid());

-- Meeting policies
CREATE POLICY "Users can read and manage meetings they organize" ON meetings
  FOR ALL TO authenticated
  USING (organizer_id = auth.uid());

CREATE POLICY "Attendees can read meetings" ON meetings
  FOR SELECT TO authenticated
  USING (auth.uid() = ANY(attendees));

-- Report policies
CREATE POLICY "Users can read and manage their reports" ON reports
  FOR ALL TO authenticated
  USING (creator_id = auth.uid());