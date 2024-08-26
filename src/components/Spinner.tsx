import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: grid;
  place-items: center;
  margin: 0 auto;
  padding: 40px, 0px, 40px, 0px;
`;

const SpinnerBox = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
`;

const StyledSpinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 100%;
  height: 100%;
`;

const Spinner: React.FC = (): React.ReactElement => {
  return (
    <LoaderWrapper>
      <SpinnerBox>
        <StyledSpinner viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="spinner-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E6E6E6" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
          </defs>
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#spinner-gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </StyledSpinner>
      </SpinnerBox>
    </LoaderWrapper>
  );
};

export default Spinner;
