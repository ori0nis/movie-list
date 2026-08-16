import type { Movie, MovieKeys } from "../types/movie.types";

export const isMovie = (value: unknown): value is Movie => {
  if (value === null || typeof value !== "object") return false;

  const movie = value as Record<MovieKeys, unknown>;

  if (typeof movie.id !== "string") return false;
  if (typeof movie.title !== "string") return false;
  if (typeof movie.year !== "number") return false;
  if (typeof movie.genre !== "string") return false;
  if (typeof movie.director !== "string") return false;
  if (typeof movie.homeRecorded !== "boolean") return false;

  return true;
}