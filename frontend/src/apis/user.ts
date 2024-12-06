import { API } from "@/context/authContext";

export const getAllUsers = async (page = 1, pageSize = 10) => {
  try {
    const response = await API.get(`/users`, {
      params: {
        page,
        pageSize,
      },
    });

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const createUser = async (data: any) => {
  try {
    const response = await API.post("/users", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

type UpdateProps = {
  id: number;
  userData: any;
};

export const updateUser = async (props: UpdateProps) => {
  try {
    const response = await API.put(`/users/${props.id}`, { ...props.userData });
    return response;
  } catch (error: any) {
    return error;
  }
};
