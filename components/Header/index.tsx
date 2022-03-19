import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled('div')`
  width: 100vw;
  padding-right: 40px;
  padding-left: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: 100px;
  backdrop-filter: blur(1px);
  padding-bottom: 20px;
  .nav_right {
    display: flex;
    flex-direction: row;
    justify-content: baseline;
    column-gap: 10px;
  }
  display: none;
`;

type Props = { children: any };

export default function Header({ children }: Props) {
  return <HeaderContainer>{children}</HeaderContainer>;
}
