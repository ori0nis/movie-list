import { useEffect, useMemo, useState } from "react";
import { getMovies } from "../service/movies.service";
import type { Movie, MovieResponse } from "../types/movie.types";
import { Box, Button, Typography } from "@mui/material";
import { Movies } from "./Movies";
import { SearchBar } from "./SearchBar";
import { byAscendingTitle } from "../utils/movieSorter";
import { normalizeUserInput } from "../utils/normalizeUserInput";

const MOVIES_PER_PAGE = 20;

export const MovieTable = () => {
  const [stableMovies, setStableMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const offset = page * MOVIES_PER_PAGE;
  const MAX_PAGE = movies.length === 0 ? 0 : Math.ceil(movies.length / MOVIES_PER_PAGE) - 1;
  const isFirstPage = page === 0;
  const isLastPage = page === MAX_PAGE;

  useEffect(() => {
    const getData = async (): Promise<MovieResponse> => {
      try {
        setLoading(true);
        const data = await getMovies();

        if (data) {
          setLoading(false);
          setStableMovies(data);

          const sortedMovies = byAscendingTitle(data);
          setMovies(sortedMovies);
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
    return movies.slice(offset, offset + MOVIES_PER_PAGE);
  }, [movies, offset]);

  const handleSetMovies = (movies: Movie[]) => {
    setMovies(movies);
  };

  const handleSearchMovies = (userInput: string) => {
    const filtered = stableMovies.filter(
      (movie) =>
        normalizeUserInput(movie.title).includes(normalizeUserInput(userInput)) ||
        normalizeUserInput(movie.director).includes(normalizeUserInput(userInput)),
    );

    handleSetMovies(filtered);
    setPage(0);
  };

  const handleClearSearch = () => {
    setMovies(byAscendingTitle(stableMovies));
    setPage(0);
  };

  const handleForward = () => {
    if (isLastPage) return;

    setPage((prev) => prev + 1);
  };

  const handleBack = () => {
    if (isFirstPage) return;

    setPage((prev) => prev - 1);
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleLastPage = () => {
    setPage(MAX_PAGE);
  };

  return (
    <Box className="movie-table">
      <SearchBar
        movies={movies}
        setMovies={handleSetMovies}
        onSearchMovies={handleSearchMovies}
        onClearSearch={handleClearSearch}
      />
      <Movies movies={visiblePage} isLoading={loading} isError={error} />
      <Button onClick={handleFirstPage} disabled={isFirstPage}>
        Primera
      </Button>
      <Button onClick={handleBack} disabled={isFirstPage}>
        Anterior
      </Button>
      <Button onClick={handleForward} disabled={isLastPage}>
        Siguiente
      </Button>
      <Button onClick={handleLastPage} disabled={isLastPage}>
        Última
      </Button>
      <Typography>{`Página ${page + 1} de ${MAX_PAGE + 1}`}</Typography>
    </Box>
  );
};
