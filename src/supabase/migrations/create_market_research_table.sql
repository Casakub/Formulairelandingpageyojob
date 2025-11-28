-- Create market_research_responses table
CREATE TABLE IF NOT EXISTS market_research_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  response_id TEXT NOT NULL UNIQUE,
  
  -- Section 1: Profil
  q1_nom TEXT NOT NULL,
  q2_annee TEXT NOT NULL,
  q3_taille TEXT NOT NULL,
  q4_secteurs TEXT[] NOT NULL,
  
  -- Section 2: Détachement
  q5_pays TEXT NOT NULL,
  q6_volume TEXT NOT NULL,
  q7_origine TEXT NOT NULL,
  q8_destinations TEXT NOT NULL,
  q9_defi TEXT NOT NULL,
  q9_autre TEXT,
  q10_gestion TEXT NOT NULL,
  q11_incidents TEXT NOT NULL,
  
  -- Section 3: Besoins
  q12_budget TEXT NOT NULL,
  q13_manque_gagner TEXT NOT NULL,
  q14_risques TEXT NOT NULL,
  q15_probleme TEXT NOT NULL,
  q16_erp TEXT NOT NULL,
  q16_autre TEXT,
  q17_migration TEXT NOT NULL,
  
  -- Section 4: Intérêt
  q18_score INTEGER NOT NULL,
  q19_features TEXT[] NOT NULL,
  q20_prix TEXT NOT NULL,
  q21_budget_mensuel TEXT NOT NULL,
  q22_mvp TEXT NOT NULL,
  
  -- Section 5: Vision
  q23_amelioration TEXT NOT NULL,
  q24_priorite TEXT NOT NULL,
  
  -- Section 6: Contact
  q25_email TEXT NOT NULL,
  autorise_contact BOOLEAN DEFAULT false,
  souhaite_rapport BOOLEAN DEFAULT false,
  
  -- Metadata enrichie
  country TEXT,
  sector TEXT,
  company_size INTEGER,
  detachment_experience TEXT,
  interest_level TEXT,
  
  -- Tracking
  ip_address TEXT,
  user_agent TEXT,
  completion_time INTEGER,
  referrer TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_market_research_created_at ON market_research_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_market_research_country ON market_research_responses(country);
CREATE INDEX IF NOT EXISTS idx_market_research_sector ON market_research_responses(sector);
CREATE INDEX IF NOT EXISTS idx_market_research_interest ON market_research_responses(interest_level);
CREATE INDEX IF NOT EXISTS idx_market_research_response_id ON market_research_responses(response_id);

-- Enable Row Level Security (RLS)
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts" ON market_research_responses
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated reads (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON market_research_responses
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated deletes (for admin)
CREATE POLICY "Allow authenticated deletes" ON market_research_responses
  FOR DELETE
  USING (true);

-- Grant permissions
GRANT INSERT ON market_research_responses TO anon;
GRANT SELECT, DELETE ON market_research_responses TO authenticated;
GRANT ALL ON market_research_responses TO service_role;

-- Add comments for documentation
COMMENT ON TABLE market_research_responses IS 'Stores market research survey responses from European temp agencies';
COMMENT ON COLUMN market_research_responses.response_id IS 'Unique identifier for tracking individual responses';
COMMENT ON COLUMN market_research_responses.completion_time IS 'Time taken to complete survey in seconds';
COMMENT ON COLUMN market_research_responses.interest_level IS 'Calculated interest level based on q18_score';
