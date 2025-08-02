-- Create song_requests table
CREATE TABLE IF NOT EXISTS song_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  song_title TEXT NOT NULL,
  artist TEXT,
  song_link TEXT,
  requester_name TEXT,
  special_message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'playing', 'completed', 'rejected')),
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_song_requests_status ON song_requests(status);
CREATE INDEX IF NOT EXISTS idx_song_requests_created_at ON song_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_song_requests_priority ON song_requests(priority);

-- Enable Row Level Security
ALTER TABLE song_requests ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
CREATE POLICY "Allow all operations on song_requests" ON song_requests
  FOR ALL USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_song_requests_updated_at 
    BEFORE UPDATE ON song_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
