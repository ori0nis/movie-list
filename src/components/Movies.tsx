import { Box, Typography } from "@mui/material";
import type { Movie } from "../types/movie.types";

interface Props {
  movies: Movie[];
  isLoading: boolean;
  isError: string;
}

export const Movies = ({movies, isLoading, isError}: Props) => {
    return (
      <Box>
        {movies.map((movie) => {
  const isHomeRecorded = movie.homeRecorded;

  return !isHomeRecorded ? (
    <Box key={movie.id}>
      <Typography>{movie.title}</Typography>
      <Typography>{movie.director}</Typography>
      <Typography>{movie.year}</Typography>
      <Typography>{movie.genre}</Typography>
    </Box>
  ) : (
    <Box key={movie.id}>
      <Typography>H {movie.title}</Typography>
      <Typography>{movie.director}</Typography>
      <Typography>{movie.year}</Typography>
      <Typography>{movie.genre}</Typography>
    </Box>
  );
})}

        {isLoading && <Typography>{isLoading}</Typography>}

        {isError && <Typography>{isError}</Typography>}
      </Box>
    );
}