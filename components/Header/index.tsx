import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled('div')`
  width:100%;
  display: flex;
  height: 100px;
  backdrop-filter: blur(1px);
  padding-bottom: 20px;

  @media screen and (max-width:760px){
    height:auto;
  }
  .container{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content:space-between ;
    margin-left:30px ;
    margin-right:30px ;

    .nav_right {
      display: flex;
      flex-direction: row;
      justify-content: baseline;
      column-gap: 10px;
    }
    @media screen and (max-width: 320px){
      width:100%;
      .nav_right{
        width:95%;
      }
    }
    @media screen and (min-width: 320px) and (max-width: 375px) {
      width: 100%;
      flex-direction:column ;
      margin:15px 0 0 0;

      .nav_left{
        margin-bottom:10px ;
      }
      .nav_right{
        padding-bottom:10px;
      }
    }
    @media screen and (min-width: 376px) and (max-width: 480px) {
      width: 100%;
      flex-direction:column ;
      margin:15px 0 0 0;

      .nav_left{
        margin-bottom:10px ;
      }
    }
  }
  
`;

type Props = { children: any };

export default function Header({ children }: Props) {
  return (
    <HeaderContainer>
      <div className="container">{children}</div>
    </HeaderContainer>
  );
}
