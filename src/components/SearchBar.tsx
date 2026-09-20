import type { Movie } from "../types/movie.types";
import { Box, Button, TextField, Typography } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import { byAscendingTitle, byAscendingYear, byDescendingTitle, byDescendingYear } from "../utils/movieSorter";
import { useState, type SyntheticEvent } from "react";

interface Props {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  onSearchMovies: (userInput: string) => void;
  onClearSearch: () => void;
}

export const SearchBar = ({ movies, setMovies, onSearchMovies, onClearSearch }: Props) => {
  const [userInput, setUserInput] = useState<string>("");

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearchMovies(userInput);
  };

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

  const handleClearSearch = () => {
    setUserInput("");
    onClearSearch();
  };

  return (
    <Box>
      {/* Form */}
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <TextField
          id="user-search"
          label="Busca una película"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        ></TextField>
        <Button type="submit">
          <SearchIcon /> Buscar
        </Button>
        <Button type="button" onClick={handleClearSearch}>
          Limpiar
        </Button>
      </Box>

      {/* Pagination */}
      <Box className="pagination">
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
      </Box>

      <Typography sx={{ textAlign: "center", mt: 1 }}>Las películas marcadas en rojo están grabadas en casa</Typography>
    </Box>
  );
};
