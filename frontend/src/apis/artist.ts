import { API } from "@/context/authContext";

export const getAllArtists = async (page = 1, pageSize = 10) => {
  try {
    const response = await API.get(`/artists`, {
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

export const createArtist = async (data: any) => {
  try {
    const response = await API.post("/artists", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const deleteArtist = async (id: number) => {
  try {
    const response = await API.delete(`/artists/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

type UpdateProps = {
  id: number;
  artistData: any;
};

export const updateArtist = async (props: UpdateProps) => {
  try {
    const response = await API.put(`/artists/${props.id}`, {
      ...props.artistData,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};
