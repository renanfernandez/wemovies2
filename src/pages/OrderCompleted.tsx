import OrderCompletedImage from "../assets/OrderCompleted";
import { PageContent, PageStyle, StyledLink } from "../styles/GlobalStyles";

function OrderCompleted(): React.ReactElement {
  return (
    <PageStyle>
      <PageContent>
        <h2>Compra realizada com sucesso!</h2>
        <OrderCompletedImage />
        <StyledLink to="/" $variant="primary">
          VOLTAR
        </StyledLink>
      </PageContent>
    </PageStyle>
  );
}

export default OrderCompleted;
