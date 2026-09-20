import type { Movie } from "../types/movie.types";

export const byDescendingTitle = (movies: Movie[]) => {
  return [...movies].sort((movieA, movieB) => movieB.title.localeCompare(movieA.title));
};

export const byAscendingTitle = (movies: Movie[]) => {
  return [...movies].sort((movieA, movieB) => movieA.title.localeCompare(movieB.title));
};

export const byDescendingYear = (movies: Movie[]) => {
  return [...movies].sort((movieA, movieB) => movieB.year - movieA.year);
};

export const byAscendingYear = (movies: Movie[]) => {
  return [...movies].sort((movieA, movieB) => movieA.year - movieB.year);
};
