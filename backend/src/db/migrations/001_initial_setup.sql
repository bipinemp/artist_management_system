CREATE TYPE gender_enum AS ENUM ('m', 'f', 'o');
CREATE TYPE genre_enum AS ENUM ('rnb', 'country', 'classic', 'rock', 'jazz');

CREATE TABLE IF NOT EXISTS user(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20),
    dob TIMESTAMP(0),
    gender gender_enum NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS artist(
    id SERIAL PRIMARY KEY,
    dob TIMESTAMP(0) NOT NULL,
    gender gender_enum NOT NULL,
    address VARCHAR(255),
    first_release_year SMALLINT NOT NULL,
    no_of_albums_released INT NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE MUSIC IF NOT EXISTS music(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    genre genre_enum NOT NULL,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL
    
    FOREIGN KEY (artist_id) INT REFERENCES artist(id) ON DELETE CASCADE
);

