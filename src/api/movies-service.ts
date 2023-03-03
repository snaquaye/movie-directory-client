import axios from "axios";
import { Movie, SearchQueries, SearchResult } from "MovieDirectory";
import baseUrl from "../config";

export const search = async (searchTerm: string, page: number) => {
  const { data } = await axios.get<SearchResult>(`${baseUrl}/movies?searchTerm=${searchTerm}&page=${page}`);
  
  return data;
} 

export const getLastFiveQueries = async () => {
  const { data } = await axios.get<SearchQueries>(`${baseUrl}/search-queries`);

  return data;
}

export const getMovieDetail = async (movieId: string) => {
  const { data } = await axios.get<Movie>(`${baseUrl}/movies/${movieId}`);

  return data;
}