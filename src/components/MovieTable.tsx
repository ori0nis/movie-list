import { useEffect, useState } from "react"
import { fetcher } from "../utils/fetcher"
import type { Movie, MovieResponse } from "../types/movie.types";
import { Box } from "@mui/material";
import { Movies } from "./Movies";

const MOVIES_PER_PAGE = 20;

export const MovieTable = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const getData = async (): Promise<MovieResponse> => {
      try {
        setLoading(true);
        const data = await fetcher();

        if (data) {
          setLoading(false);
          setMovies(data);
        }

        return undefined;
      } catch (error: any) {
        console.error(error);
        error instanceof Error ? setError(error?.message) : setError("There was an error loading the data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <Box>
      <Movies movies={movies} isLoading={loading} isError={error} />
    </Box>
  );
}