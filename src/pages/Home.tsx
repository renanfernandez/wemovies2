import ReloadGirl from "../assets/ReloadGirl";
import { IMovieType } from "../context/MoviesContext";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import {
  Container,
  PageContent,
  PageStyle,
  spacing,
  StyledLink,
} from "../styles/GlobalStyles";
import { styled } from "styled-components";
import Spinner from "../components/Spinner";

const MovieListStyle = styled(Container)`
  display: grid;
  gap: ${spacing.lg};

  @media (min-width: 484px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 677px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function Home(): React.ReactElement {
  const [moviesList, setMoviesList] = useState<IMovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMovies = async (): Promise<IMovieType[]> => {
    setIsLoading(true);
    const response = await fetch("https://wefit-movies.vercel.app/api/movies");
    const data = await response.json();
    const movies: IMovieType[] = data.products;
    setIsLoading(false);
    return movies;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      setMoviesList(movies);
    };

    fetchMovies();
  }, []);

  return (
    <main>
      {isLoading ? (
        <><Spinner /></>
      ) : (
        <>
          {moviesList.length > 0 ? (
            <MovieListStyle className="movie-list">
              {moviesList?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </MovieListStyle>
          ) : (
            <PageStyle>
              <PageContent>
                <h2>Parece que não há nada por aqui :( </h2>
                <ReloadGirl />
                <StyledLink to="/" $variant="primary">
                  Recarregar página
                </StyledLink>
              </PageContent>
            </PageStyle>
          )}
        </>
      )}
    </main>
  );
}
