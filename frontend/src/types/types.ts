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
