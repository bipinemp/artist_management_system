DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'artist' 
                   AND column_name = 'name') THEN
        ALTER TABLE artist ADD COLUMN name VARCHAR(255) NOT NULL;
    END IF;
END $$;
