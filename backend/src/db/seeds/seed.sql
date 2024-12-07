INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'hashedpassword1', '123-456-7890', '1990-01-01', 'm', '123 Main St'),
  ('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', '123-456-7891', '1985-05-10', 'f', '456 Oak Ave'),
  ('Alex', 'Johnson', 'alex.johnson@example.com', 'hashedpassword3', '123-456-7892', '1992-03-15', 'm', '789 Pine Rd'),
  ('Emily', 'Davis', 'emily.davis@example.com', 'hashedpassword4', '123-456-7893', '1988-07-20', 'f', '321 Birch Blvd'),
  ('Michael', 'Williams', 'michael.williams@example.com', 'hashedpassword5', '123-456-7894', '1991-08-30', 'm', '654 Maple St'),
  ('Sarah', 'Miller', 'sarah.miller@example.com', 'hashedpassword6', '123-456-7895', '1987-12-05', 'f', '987 Cedar Dr'),
  ('David', 'Wilson', 'david.wilson@example.com', 'hashedpassword7', '123-456-7896', '1993-11-01', 'm', '123 Elm St'),
  ('Laura', 'Moore', 'laura.moore@example.com', 'hashedpassword8', '123-456-7897', '1989-06-14', 'f', '321 Willow Rd'),
  ('Chris', 'Taylor', 'chris.taylor@example.com', 'hashedpassword9', '123-456-7898', '1990-02-28', 'm', '654 Pine Ave'),
  ('Olivia', 'Anderson', 'olivia.anderson@example.com', 'hashedpassword10', '123-456-7899', '1986-04-22', 'f', '987 Oak Blvd'),
  ('Ethan', 'Thomas', 'ethan.thomas@example.com', 'hashedpassword11', '123-456-7900', '1994-09-12', 'm', '123 Maple Rd');

INSERT INTO artist (dob, gender, address, first_release_year, no_of_albums_released, name)
VALUES
  ('1980-01-01', 'm', '123 Music St', 2005, 5, 'Artist 1'),
  ('1982-02-02', 'f', '456 Music Ave', 2008, 3, 'Artist 2'),
  ('1984-03-03', 'm', '789 Music Rd', 2010, 7, 'Artist 3'),
  ('1986-04-04', 'f', '321 Music Blvd', 2012, 2, 'Artist 4'),
  ('1988-05-05', 'm', '654 Music Dr', 2015, 4, 'Artist 5'),
  ('1990-06-06', 'f', '987 Music Ln', 2017, 6, 'Artist 6'),
  ('1992-07-07', 'm', '123 Melody St', 2019, 1, 'Artist 7'),
  ('1994-08-08', 'f', '321 Harmony Rd', 2020, 2, 'Artist 8'),
  ('1996-09-09', 'm', '654 Rhythm Ave', 2021, 3, 'Artist 9'),
  ('1998-10-10', 'f', '987 Groove Blvd', 2023, 5, 'Artist 10'),
  ('2000-11-11', 'm', '123 Vibe St', 2024, 2, 'Artist 11');


DO $$ 
DECLARE
  artist_record RECORD;
BEGIN
  FOR artist_record IN SELECT id FROM artist LIMIT 11
  LOOP
    INSERT INTO music (title, album_name, genre, artist_id)
    VALUES
      ('Song 1', 'Album 1', 'rnb', artist_record.id),
      ('Song 2', 'Album 2', 'country', artist_record.id),
      ('Song 3', 'Album 3', 'classic', artist_record.id),
      ('Song 4', 'Album 4', 'rock', artist_record.id),
      ('Song 5', 'Album 5', 'jazz', artist_record.id),
      ('Song 6', 'Album 6', 'rnb', artist_record.id),
      ('Song 7', 'Album 7', 'country', artist_record.id),
      ('Song 8', 'Album 8', 'classic', artist_record.id),
      ('Song 9', 'Album 9', 'rock', artist_record.id),
      ('Song 10', 'Album 10', 'jazz', artist_record.id),
      ('Song 11', 'Album 11', 'rnb', artist_record.id);
  END LOOP;
END $$;
