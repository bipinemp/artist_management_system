import { API } from "@/context/authContext";

export const getAllArtistMusics = async (
  page = 1,
  pageSize = 10,
  artist_id: number
) => {
  try {
    const response = await API.get(`/musics`, {
      params: {
        page,
        pageSize,
        artist_id,
      },
    });

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const createMusic = async (data: any) => {
  try {
    const response = await API.post("/musics", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const deleteMusic = async (id: number) => {
  try {
    const response = await API.delete(`/musics/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

type UpdateProps = {
  id: number;
  musicData: any;
};

export const updateMusic = async (props: UpdateProps) => {
  try {
    const response = await API.put(`/musics/${props.id}`, {
      ...props.musicData,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};
