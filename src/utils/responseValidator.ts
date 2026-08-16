import type { Movie } from "../types/movie.types";
import { isMovie } from "./isMovie";

export const responseValidator = (data: unknown): data is Movie[] => {
  if (!data || !Array.isArray(data)) return false;

  for (const movie of data) {
    const validated = isMovie(movie);

    if(!validated) return false;
  }

  return true;
}

