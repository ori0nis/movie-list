import type { MovieResponse } from "../types/movie.types";
import { responseValidator } from "../utils/responseValidator";

export const getMovies = async (): Promise<MovieResponse> => {
  const data = await fetch("/data.json");
  const response = await data.json();

  const validated = responseValidator(response);

  if (!validated) {
    throw new Error("Couldn't validate data response");
  }

  return response;
};
