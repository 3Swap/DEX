import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spin = styled('div')<any>`
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  .loader {
    border: 3px solid #dcdcdc;
    border-top: 3px solid #4500a0;
    border-radius: 50%;
    width: ${props => props.width || '40px'};
    height: ${props => props.height || '40px'};
    animation: ${rotate} 1s linear infinite;
  }
`;

const Spinner = ({ width, height }: any) => (
  <Spin width={width} height={height}>
    <div className="loader"></div>
  </Spin>
);

export default Spinner;
