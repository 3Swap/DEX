import React from 'react';
import styled from 'styled-components';

const MainContainer = styled('div')`
  height: 500px;
  width: 500px;
  position: absolute;
  background: red;
  z-index: 3;
`;

const style = {
  padding: 6,
  backgroundColor: 'transparent',
  color: 'white',
  height: '410px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '40px',
  alignItems: 'center',
  width: '250px',
  marginLeft: '-125px'
};

const CustomTooltip = (props: any) => {
  const { active, payload, changeIn24h, setCurrSymbolPrice } = props;
  if (active) {
    const currData = payload && payload.length ? payload[0].payload : null;
    if (currData && currData.pv) {
      setCurrSymbolPrice(currData);
    }

    return <MainContainer></MainContainer>;
  }

  return null;
};

export default CustomTooltip;
