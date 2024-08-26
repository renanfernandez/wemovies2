import { Link } from "react-router-dom";
import styled, { createGlobalStyle, css } from "styled-components";

// Variables

export const colors = {
  white: "#fff",
  bgColor: "#2F2E41",
  bgDefault: "#cccccc",
  primaryColor: "#009EDD",
  secondaryColor: "#039B00",
  textDefault: "#2F2E41",
  textSubdue: "#999999",
};

export const spacing = {
  sm: "8px",
  md: "16px",
  lg: "24px",
};

export const borderRadius = "4px";

export const fonts = {
  open: '"Open Sans", sans-serif',
};

// Global
export const GlobalStyle = createGlobalStyle`
  * { 
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    font-family:${fonts.open};
  }

  button {
    outline: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    font-family: ${fonts.open};
    font-size: 1rem;
    line-height: 1rem;
  }

  body {
    background-color: ${colors.bgColor};
    color: ${colors.textDefault};
    font-size: 16px;
    font-family: ${fonts.open};
  }
`;

// Styles

export const Flex = styled.div<{
  $alignItems?: string;
  $justifyContent?: string;
  $gap?: string;
}>`
  display: flex;
  ${(props) => props.$gap && `gap: ${props.$gap};`}
  ${(props) => props.$alignItems && `align-items: ${props.$alignItems};`}
  ${(props) =>
    props.$justifyContent && `justify-content: ${props.$justifyContent};`}
`;

export const Grid = styled.div`
  display: grid;
`;

export const Container = styled(Flex)`
  margin: 0 auto;
  max-width: 1080px;
  width: 100%;
  padding: 0 ${spacing.md};
`;

// Font Sizes

export const fontClasses = {
  xs: css`
    font-size: 0.75rem;
    line-height: 150%;
  `,
  sm: css`
    font-size: 0.875rem;
    line-height: 150%;
  `,
  md: css`
    font-size: 1rem;
    line-height: 150%;
  `,
  lg: css`
    font-size: 1.25rem;
    line-height: 143%;
  `,
  xl: css`
    font-size: 1.5rem;
    line-height: 137%;
  `,
  font700: css`
    font-weight: 700;
  `,
  font600: css`
    font-weight: 600;
  `,
};

export const Button = styled.button<{ $variant?: string; $full?: boolean }>`
  ${fontClasses.font700};
  ${fontClasses.md};
  border-radius: ${borderRadius};
  padding: ${spacing.sm};
  gap: ${spacing.sm};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    !props.$full &&
    css`
      max-width: 173px;
    `}

  ${(props) =>
    !props.$variant &&
    css`
      background-color: ${colors.bgDefault};
      color: ${colors.textDefault};
    `}

  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: ${colors.primaryColor};
      color: ${colors.white};
    `}

  ${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: ${colors.secondaryColor};
      color: ${colors.white};
    `}
`;

export const StyledLink = styled(Link)<{ $variant?: string; $full?: boolean }>`
  ${fontClasses.font700};
  ${fontClasses.md};
  border-radius: ${borderRadius};
  padding: ${spacing.sm};
  gap: ${spacing.sm};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    !props.$full &&
    css`
      max-width: 173px;
    `}

  ${(props) =>
    !props.$variant &&
    css`
      background-color: ${colors.bgDefault};
      color: ${colors.textDefault};
    `}

${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: ${colors.primaryColor};
      color: ${colors.white};
    `}

${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: ${colors.secondaryColor};
      color: ${colors.white};
    `}
`;

export const PageStyle = styled.section`
  display: grid;
  place-items: center;
  margin: 0 auto;
  max-width: 1080px;
  width: 100%;
  padding: 0 ${spacing.md};
`;

export const PageContent = styled.div`
  background-color: ${colors.white};
  border-radius: ${borderRadius};
  display: grid;
  place-items: center;
  width: 100%;
  height: clamp(80vh, 100vh, 596px);
  padding: 64px;
`;
