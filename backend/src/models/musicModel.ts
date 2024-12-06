import pool from "../configs/db";

export const getArtistMusics = async (
  page: number = 1,
  pageSize: number = 10,
  artist_id: number
) => {
  try {
    const skip = (page - 1) * pageSize;

    const result = await pool.query(
      `SELECT * FROM music WHERE artist_id = $1 
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [artist_id, pageSize, skip]
    );

    const musicsCountResult = await pool.query(
      "SELECT COUNT(id) FROM music WHERE artist_id = $1",
      [artist_id]
    );
    const totalMusics = parseInt(musicsCountResult.rows[0].count);
    const totalPages = Math.ceil(totalMusics / pageSize);

    return {
      musics: result.rows,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    throw new Error("Unable to fetch musics from database.");
  }
};

export const createMusic = async (
  artist_id: number,
  title: string,
  album_name: string,
  genre: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO music (title, album_name, genre, artist_id)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, album_name, genre, artist_id]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("Unable to create music in database.");
  }
};

export const updateMusic = async (
  music_id: number,
  title: string,
  album_name: string,
  genre: string
) => {
  try {
    const musicExists = await pool.query("SELECT id FROM music WHERE id = $1", [
      music_id,
    ]);

    if (musicExists.rows.length === 0) {
      throw new Error("Music does not exists.");
    }

    const updateResult = await pool.query(
      `UPDATE music SET title = $1, album_name = $2, genre = $3
       WHERE id = $4 RETURNING *`,
      [title, album_name, genre, music_id]
    );

    return updateResult.rows[0];
  } catch (error) {
    throw new Error("Unable to update music in database.");
  }
};

export const deleteMusic = async (id: number) => {
  try {
    const musicExists = await pool.query("SELECT id FROM music WHERE id = $1", [
      id,
    ]);

    if (musicExists.rows.length === 0) {
      throw new Error("Music does not exists.");
    }

    const deleteResult = await pool.query("DELETE FROM music WHERE id = $1", [
      id,
    ]);

    return deleteResult.rowCount;
  } catch (error) {
    throw new Error("Unable to delete music from database.");
  }
};
