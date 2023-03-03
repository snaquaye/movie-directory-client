module "MovieDirectory" {
  type SearchFormType = {
    searchTerm: string | null | undefined
  }

  interface Rating {
    source: string;
    value: string;
  }

  interface Movie {
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: Rating[];
    metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbId: string;
    type: string;
    dvd: string;
    boxOffice: string;
    production: string;
    website: string;
    response: string;
  }

  type SearchResultItem = Pick<Movie, "title" | "year" | "imdbId" | "type" | "poster">;

  type SearchResult = {
    data: SearchResultItem[],
    totalRecords: string
  };

  interface SearchQueries {
    data: { 
      query: string
     }[];
  }
}
