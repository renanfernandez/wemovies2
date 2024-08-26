import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, useContext } from "react";

export interface IMovieType {
  id: string;
  title: string;
  price: number;
  image: string;
  qnt: number
}

interface IMovieContext {
  selectedMovies: IMovieType[];
  setSelectedMovies: Dispatch<SetStateAction<IMovieType[]>>
}

const MovieContext = createContext<IMovieContext | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {

  const [selectedMovies, setSelectedMovies] = useState<IMovieType[]>([])   

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(selectedMovies));
  }, [selectedMovies]);

  return (
    <MovieContext.Provider value={{ selectedMovies, setSelectedMovies }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies(): IMovieContext {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('Erro');
  }
  return context
}