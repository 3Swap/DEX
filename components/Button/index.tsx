import React from 'react';
import styled from 'styled-components';

type Props = {};

const Button = ({ name, onClick }: any) => {
  const ButtonDiv = styled.button`
    width: 145px;
    height: 38px;
    background: rgba(69, 0, 160, 1);
    border-radius: 5px;
    color: white;
  `;
  return (
    <div>
      <ButtonDiv>Button</ButtonDiv>
    </div>
  );
};

export default Button;
