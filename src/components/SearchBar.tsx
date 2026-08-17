import type { Movie } from "../types/movie.types";
import { Box, Button } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import { type Dispatch, type SetStateAction } from "react";

interface Props {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>
}

export const SearchBar = ({ movies, setMovies }: Props) => {
    const byDescendingTitle = [...movies].sort((movieA, movieB) => movieB.title.localeCompare(movieA.title));
    const byAscendingTitle = [...movies].sort((movieA, movieB) => movieA.title.localeCompare(movieB.title));
    const byDescendingYear = [...movies].sort((movieA, movieB) => movieB.year - movieA.year);
    const byAscendingYear = [...movies].sort((movieA, movieB) => movieA.year - movieB.year);

  const handleDescendingTitle = () => {
    setMovies(byDescendingTitle)
  };

  const handleAscendingTitle = () => {
    setMovies(byAscendingTitle);
  };

  const handleDescendingYear = () => {
    setMovies(byDescendingYear);
  };

  const handleAscendingYear = () => {
    setMovies(byAscendingYear)
  }; 

  return (
    <Box>
      <Button onClick={handleDescendingTitle}>
        <SortByAlphaIcon />
      </Button>
      <Button onClick={handleAscendingTitle}>
        <SortByAlphaIcon />
      </Button>
      <Button onClick={handleDescendingYear}>
        <ArrowDownwardIcon />
        <CalendarTodayIcon />
      </Button>
      <Button onClick={handleAscendingYear}>
        <ArrowUpwardIcon />
        <CalendarTodayIcon />
      </Button>
      <Button></Button>
    </Box>
  );
};