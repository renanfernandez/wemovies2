import { useEffect, useState } from "react";
import { IMovieType, useMovies } from "../context/MoviesContext";
import styled from "styled-components";
import { borderRadius, Button, colors, fontClasses, spacing } from "../styles/GlobalStyles";
import IconAddCart from "../assets/icons/IconAddCart";

const MovieItemStyle = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.md};
  display: grid;
  gap: ${spacing.md};
  text-align: center;
  border-radius: ${borderRadius};
}`;

const MovieItemDescription = styled.div`
  h3 {
    ${fontClasses.xs};
    ${fontClasses.font700};
  }

  span {
    ${fontClasses.md};
    ${fontClasses.font700};
  }
`;

const MovieItemPoster = styled.figure`
  width: 100%;
  height: 188px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`;

type Props = {
  movie: IMovieType;
};

function MovieItem({ movie }: Props) : React.ReactElement {
  const [count, setCount] = useState(0);
  const { selectedMovies, setSelectedMovies } = useMovies();

  const movieIsSelected = (id: string) => {
    return selectedMovies.some((movie) => {
      return movie.id === id;
    });
  };

  const handleAddMovie = (movie: IMovieType) => {
    if (movieIsSelected(movie.id)) {
      const updatedSelection = selectedMovies.map((selectedMovie) => {
        if (selectedMovie.id === movie.id) {
          setCount(selectedMovie.qnt + 1);
          return { ...selectedMovie, qnt: selectedMovie.qnt + 1 };
        }
        return selectedMovie;
      });
      setSelectedMovies(updatedSelection);
    } else {
      setCount((prev) => prev + 1);
      setSelectedMovies((prev) =>
        prev.concat({
          id: movie.id,
          title: movie.title,
          price: movie.price,
          image: movie.image,
          qnt: 1,
        })
      );
    }
  };

  useEffect(() => {
    const currentMovie: IMovieType | undefined = selectedMovies.find(
      (selectedMovie) => selectedMovie.id === movie.id
    );
    setCount(currentMovie?.qnt || 0);
  }, [selectedMovies]);

  return (
    <MovieItemStyle>
      <MovieItemPoster>
        <img src={movie.image} alt={movie.title} />
      </MovieItemPoster>
      <MovieItemDescription>
        <h3>{movie.title}</h3>
        <span>R$ {movie.price.toFixed(2)}</span>
      </MovieItemDescription>
      <Button
        $variant={count > 0 ? "secondary" : "primary"}
        $full
        onClick={() => handleAddMovie(movie)}
      >
        <IconAddCart />
        {count}
        <span> ADICIONAR AO CARRINHO</span>
      </Button>
    </MovieItemStyle>
  );
}

export default MovieItem;
