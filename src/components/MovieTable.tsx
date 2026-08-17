import { useEffect, useMemo, useState } from "react"
import { fetcher } from "../utils/fetcher"
import type { Movie, MovieResponse } from "../types/movie.types";
import { Box, Button, Typography } from "@mui/material";
import { Movies } from "./Movies";
import { SearchBar } from "./SearchBar";

const MOVIES_PER_PAGE = 20;

export const MovieTable = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const offset = page * MOVIES_PER_PAGE;
  const MAX_PAGE = Math.ceil(movies.length / MOVIES_PER_PAGE) - 1;
  const isFirstPage = page === 0;
  const isLastPage = page === MAX_PAGE;

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

  const visiblePage = useMemo(() => {
    return movies.slice(offset, offset + MOVIES_PER_PAGE)
  }, [movies, offset])

  const handleForward = () => {
    if (isLastPage) return;

    setPage((prev) => prev + 1);
  }

  const handleBack = () => {
    if(isFirstPage) return;

    setPage((prev) => prev - 1);
  };

  return (
    <Box>
      <SearchBar movies={movies} setMovies={setMovies}/>
      <Movies movies={visiblePage} isLoading={loading} isError={error} />
      <Button onClick={handleBack} disabled={isFirstPage}>
        Anterior
      </Button>
      <Button onClick={handleForward} disabled={isLastPage}>
        Siguiente
      </Button>
      <Typography>{`Página ${page + 1} de ${MAX_PAGE}`}</Typography>
    </Box>
  );
}
