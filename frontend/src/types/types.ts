export type User = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  access_token: string;
};

export type FullUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  address: string;
  phone: string;
  gender: "m" | "f" | "o";
};

export type PaginatedUsersData = {
  message: string;
  usersData: {
    pagination: {
      currentPage: number;
      totalPages: number;
    };
    users: FullUser[];
  };
};

export type FullMusic = {
  id: number;
  title: string;
  genre: "rnb" | "country" | "classic" | "rock" | "jazz";
  album_name: string;
};

export type FullArtist = {
  id: number;
  name: string;
  dob: string;
  gender: "m" | "f" | "o";
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
  musics?: FullMusic[];
};

export type PaginatedArtistData = {
  message: string;
  artistsData: {
    pagination: {
      currentPage: number;
      totalPages: number;
    };
    artists: FullArtist[];
  };
};

export type PaginatedMusicsData = {
  message: string;
  artistMusicData: {
    pagination: {
      currentPage: number;
      totalPages: number;
    };
    musics: FullMusic[];
  };
};
