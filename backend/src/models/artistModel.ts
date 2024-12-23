import pool from "../configs/db";

export const getArtists = async (page: number = 1, pageSize: number = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    const result = await pool.query(
      `SELECT artist.*,
       COALESCE(json_agg(json_build_object(
        'id', music.id,
        'title', music.title,
        'album_name', music.album_name,
        'genre', music.genre
        ) 
       ) FILTER (WHERE music.id IS NOT NULL), '[]') AS musics
       FROM artist
       LEFT JOIN music
       ON artist.id = music.artist_id
       GROUP BY artist.id
       LIMIT $1 OFFSET $2
       `,
      [pageSize, skip]
    );

    const artistsCountResult = await pool.query("SELECT COUNT(id) from artist");
    const totalArtists = parseInt(artistsCountResult.rows[0].count);
    const totalPages = Math.ceil(totalArtists / pageSize);

    return {
      artists: result.rows,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    throw new Error("Unable to fetch artists from database.");
  }
};

export const createArtist = async (
  name: string,
  dob: string,
  gender: string,
  address: string,
  first_release_year: number,
  no_of_albums_released: number
) => {
  try {
    const result = await pool.query(
      `INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums_released)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [
        name,
        dob,
        gender,
        address || null,
        first_release_year,
        no_of_albums_released,
      ]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("Unable to create artist in database.");
  }
};

export const updateArtist = async (
  id: number,
  name: string,
  dob: string,
  gender: string,
  address: string,
  first_release_year: number,
  no_of_albums_released: number
) => {
  try {
    const artistExists = await pool.query(
      "SELECT id FROM artist WHERE id = $1",
      [id]
    );

    if (artistExists.rows.length === 0) {
      throw new Error("Artist does not exists.");
    }

    const updateResult = await pool.query(
      `UPDATE artist SET name = $1, dob = $2, gender = $3, address = $4, first_release_year = $5, no_of_albums_released = $6 
       WHERE id = $7 RETURNING *`,
      [
        name,
        dob,
        gender,
        address || null,
        first_release_year,
        no_of_albums_released,
        id,
      ]
    );

    return updateResult.rows[0];
  } catch (error) {
    throw new Error("Unable to update artist in database.");
  }
};

export const deleteArtist = async (id: number) => {
  try {
    const artistExists = await pool.query(
      "SELECT id FROM artist WHERE id = $1",
      [id]
    );

    if (artistExists.rows.length === 0) {
      throw new Error("Artist does not exists.");
    }

    const deleteResult = await pool.query("DELETE FROM artist WHERE id = $1", [
      id,
    ]);

    return deleteResult.rowCount;
  } catch (error) {
    throw new Error("Unable to delete artist from database.");
  }
};
