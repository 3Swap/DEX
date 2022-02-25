import React from 'react';
import styled from 'styled-components';

type Props = {};

const ButtonDiv = styled.button`
  width: 145px;
  height: 38px;
  background: rgba(69, 0, 160, 1);
  border-radius: 5px;
  color: white;
`;

const Button = ({ name, handleClick }: any) => {
  const handClick = () => {
    return handleClick();
  };
  return (
    <div>
      <ButtonDiv onClick={handClick}>{name}</ButtonDiv>
    </div>
  );
};

export default Button;
