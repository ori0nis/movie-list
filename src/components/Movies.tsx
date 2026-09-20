import { Box, Typography } from "@mui/material";
import type { Movie } from "../types/movie.types";

interface Props {
  movies: Movie[];
  isLoading: boolean;
  isError: string;
}

export const Movies = ({ movies, isLoading, isError }: Props) => {
  return (
    <Box className="movie-list">
      {movies.map((movie) => {
        const isHomeRecorded = movie.homeRecorded;

        return !isHomeRecorded ? (
          <Box key={movie.id} className="movie-row">
            <Typography className="movie-title">{movie.title}</Typography>
            <Typography>{movie.director}</Typography>
            <Typography>{movie.year}</Typography>
            <Typography>{movie.genre}</Typography>
          </Box>
        ) : (
          <Box key={movie.id} className="movie-row">
            <Typography className="movie-title home-recorded">{movie.title}</Typography>
            <Typography>{movie.director}</Typography>
            <Typography>{movie.year}</Typography>
            <Typography>{movie.genre}</Typography>
          </Box>
        );
      })}

      {isLoading && <Typography>Cargando películas...</Typography>}

      {isError && <Typography>Error al cargar las películas</Typography>}
    </Box>
  );
};
