export type Gender = "m" | "f" | "o";
export type Genre = "rnb" | "country" | "classic" | "rock" | "jazz";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  dob?: string;
  gender: Gender;
  address?: string;
  created_at: string;
  updated_at: string;
};

export type Artist = {
  id: number;
  dob: string;
  gender: Gender;
  address?: string;
  first_release_year: number;
  no_of_albums_released: number;
  created_at: string;
  updated_at: string;
};

export type Music = {
  id: number;
  title: string;
  album_name: string;
  genre: Genre;
  artist_id: number;
  created_at: string;
  updated_at: string;
};
