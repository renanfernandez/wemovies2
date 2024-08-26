import styled from "styled-components"
import { useMovies } from "../context/MoviesContext"
import { colors, Container, fontClasses, spacing } from "../styles/GlobalStyles"
import { Link } from "react-router-dom"
import IconCasket from "../assets/icons/IconCasket"

const HeaderStyle = styled.header`
  padding: ${spacing.lg} ${spacing.md};~
  color: ${colors.white};
  background-color: ${colors.bgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderLogo = styled(Link)`
  ${fontClasses.lg};
  color: ${colors.white};
`

const CartButton = styled(Link)`
  color: ${colors.white};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
}`

const CartButtonContent = styled.div`
  display: grid;
  justify-content: flex-end;

  h2 {
    ${fontClasses.sm};
  }

`

const CartButtonCount = styled.div`
  ${fontClasses.xs};
  ${fontClasses.font600};
  color: ${colors.textSubdue};
  gap: 4px;
  display: flex;
  justify-content: flex-end;
  text-align: right;
`

const CartIcon = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
`

export default function Header() {

  const {selectedMovies } = useMovies()

  return (
    <HeaderStyle>
      <Container $alignItems="center" $justifyContent="space-between">
        <HeaderLogo to='/'>
          WeMovies
        </HeaderLogo>

        <CartButton to='/carrinho' >
          <CartButtonContent className="cart-btn--content">
            <h2>Meu Carrinho</h2>
            <CartButtonCount className="cart-btn--count">
              {selectedMovies?.length} {selectedMovies?.length === 1 ? ' item' : ' items'}
            </CartButtonCount>
          </CartButtonContent>
          <CartIcon>
            <IconCasket /> 
          </CartIcon>
        </CartButton>
      </Container>
    </HeaderStyle>
  )
}