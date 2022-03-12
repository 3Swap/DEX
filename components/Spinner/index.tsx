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

const Spin = styled('div')`
  margin-top: 1em;
  margin-bottom: 1em;
  .loader {
    border: 3px solid #dcdcdc;
    border-top: 3px solid #4500a0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${rotate} 1s linear infinite;
  }
`;

const Spinner = () => (
  <Spin>
    <div className="loader"></div>
  </Spin>
);

export default Spinner;
