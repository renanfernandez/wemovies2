import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconTrash from '../assets/icons/IconTrash'
import IconMinus from '../assets/icons/IconMinus'
import IconPlus from '../assets/icons/IconPlus'
import { IMovieType, useMovies } from '../context/MoviesContext'
import { styled } from 'styled-components'
import { borderRadius, Button, colors, Container, fontClasses, spacing } from '../styles/GlobalStyles'
import useIsMobile from '../hooks/isMobile'


export const CartPageStyle = styled.section`

`;

export const CartItems = styled.div`
  padding: ${spacing.lg};
  width: 100%;
  display: grid;
  background-color: ${colors.white};
  border-radius: ${borderRadius};
  gap: ${spacing.lg};
}`;

const CartResume = styled.div`
  padding-top: ${spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${colors.textSubdue};
`;

const CartTotal = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  span {
    ${fontClasses.sm};
    color: ${colors.textSubdue};
  }

  h2 {
    ${fontClasses.xl};
    min-width: 130px;
    text-align: center;
  }

`;

const CartRow = styled.div`
  ${fontClasses.sm};
  color: ${colors.textSubdue};
  ${fontClasses.font700};
  align-items: center;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 100px;
  display: grid;
  
`;

const CartItem = styled.div`
  display: grid;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 100px;
  }

  @media (max-width: 767px) {
    grid-template-areas: 'poster product product delete'
                         'poster quantity subtotal delete';
    grid-template-columns: 120px minmax(0, 2fr) minmax(0, 1fr) 40px;
    gap: ${spacing.sm};
    align-items: center;
  }
`

const CartProduct = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};

  @media (max-width: 767px) {
    grid-area: product;
  }
`;

const CartProductDescription = styled.div`
    display: grid;
    gap: ${spacing.sm};
    
    h3 {
      ${fontClasses.xs};
      ${fontClasses.font700};
    }
    
    span {
      ${fontClasses.md};
      ${fontClasses.font700};
      white-space: nowrap;
    
      @media (min-width: 768px) {
        font-size: 14px;
      }
    }
`;

const CartItemSubtotal = styled.div`
  ${fontClasses.sm};
  ${fontClasses.font700};

  @media (max-width: 767px) {
    grid-area: subtotal;
  }
`;

const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  @media (max-width: 767px) {
    grid-area: quantity;
  }

  p {
    ${fontClasses.sm};
    color: ${colors.textDefault};
    display: grid;
    place-content: center;
    height: 26px;
    width: 62px;
    border: 1px solid ${colors.textSubdue};
    border-radius: ${borderRadius};
  }

  button {
    &:disabled {
        opacity: .3;
      }
  }

`;

const CartItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CartItemImage = styled.figure`
  max-width: 115px;
  overflow: hidden;
  border-radius: ${borderRadius};


  img {
    display: block;
    max-width: 100%;
  }
`;

export default function Cart() : React.ReactElement {
  const navigate = useNavigate()
  const {selectedMovies, setSelectedMovies} = useMovies()
  const isMobile = useIsMobile()

  const [cartItems, setCartItems] = useState<IMovieType[]>(selectedMovies)

  const getTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total = total + (item.qnt * item.price);
    })
    
    return total.toFixed(2)
  }

  const removeCartItem = (id: string) => {
    setSelectedMovies(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id : string, type: string) => {

    const updatedSelection = selectedMovies.map(selectedMovie => {
      if (selectedMovie.id === id) {
        if ( type === 'plus') {
          return {...selectedMovie, 'qnt': selectedMovie.qnt + 1}
        } else {
          return {...selectedMovie, 'qnt': selectedMovie.qnt - 1}
        }
      }
      return selectedMovie
    })
    setSelectedMovies(updatedSelection)
  }

  const handleSubmit = () => {
    localStorage.removeItem('cart')
    setSelectedMovies([])
    navigate('/pedido-finalizado')
  }

  useEffect(() => {
    setCartItems(selectedMovies)
  }, [selectedMovies])

  return (
    <CartPageStyle>
      <Container>
        <CartItems>
          {cartItems?.length > 0 ? (
            <>
              {!isMobile && (
                <CartRow>
                  <div>PRODUTO</div>
                  <div>QTD</div>
                  <div>SUBTOTAL</div>
                  <div></div>
                </CartRow>
              )}
              {cartItems.map(item => {
                return (
                  <CartItem key={item.id}>
                    {isMobile && (
                      <CartItemImage className="cart-item--image-mobile">
                        <img src={item.image} alt={item.title} />
                      </CartItemImage>
                    )}
                    <CartProduct>
                      {!isMobile && (
                        <CartItemImage className="cart-item--image-mobile">
                          <img src={item.image} alt={item.title} />
                        </CartItemImage>
                      )}
                      <CartProductDescription>
                        <h3>{item.title}</h3>
                        <span>R$ {item.price}</span>
                      </CartProductDescription>
                    </CartProduct>
                    <CartItemQuantity>
                      <button disabled={item.qnt === 1} onClick={() => updateQuantity(item.id, 'minus')}>
                        <IconMinus />
                      </button>
                      <p>{item.qnt}</p>
                      {/* 
                        TODO -> mudar para input para o usuário escolher quantidade 
                      */}
                      <button onClick={() => updateQuantity(item.id, 'plus')}>
                        <IconPlus />
                      </button>
                    </CartItemQuantity>
                    <CartItemSubtotal>
                      R$ {(item.qnt * item.price).toFixed(2)}
                    </CartItemSubtotal>
                    <CartItemActions>
                      <button onClick={() => removeCartItem(item.id)}>
                        <IconTrash />
                      </button>
                    </CartItemActions>
                  </CartItem>
                )
              })}
              <CartResume>
                <Button $variant='primary' onClick={handleSubmit}>FINALIZAR PEDIDO</Button>
                <CartTotal>
                  <span>TOTAL</span>
                  <h2>R$ {getTotal()}</h2>
                </CartTotal>
              </CartResume>
            </>
          ) : (
            <>
              <h2>Nenhum produto selecionado :(</h2>
            </>
          )}
        </CartItems>
      </Container>
    </CartPageStyle>
  )
}

