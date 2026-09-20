import type { Movie } from "../types/movie.types";
import { Box, Button } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
/* import SearchIcon from "@mui/icons-material/Search"; */
import { byAscendingTitle, byAscendingYear, byDescendingTitle, byDescendingYear } from "../utils/movieSorter";

interface Props {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
}

export const SearchBar = ({ movies, setMovies }: Props) => {
  const handleDescendingTitle = () => {
    setMovies(byDescendingTitle(movies));
  };

  const handleAscendingTitle = () => {
    setMovies(byAscendingTitle(movies));
  };

  const handleDescendingYear = () => {
    setMovies(byDescendingYear(movies));
  };

  const handleAscendingYear = () => {
    setMovies(byAscendingYear(movies));
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
