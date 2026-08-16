export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  director: string;
  homeRecorded: boolean;
}

export type MovieResponse = Movie[] | undefined;
export type MovieKeys = keyof Movie;