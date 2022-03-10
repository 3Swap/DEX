import styled from 'styled-components';
import React, { useState, PureComponent, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTick';
import axios from 'axios';

const ChartArea = styled.div`
  width: 900px;
  height: 500px;

  position: relative;
  font-family: Poppins;
  background: transparent;
  z-index: 0;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;

  .responsive-container {
    margin-left: -1.8em;

    height: 100%;
  }

  @media (max-width: 960px) {
    width: 311px;
    height: 394px;
    margin: 30px 0;
  }
`;

const TransparenDiv = styled.div`
  position: absolute;
  background: #00ff0000;
  height: 100%;
  width: 100%;
`;

interface BtnProps {
  isActive: boolean;
}

const TabBtn = styled.div<BtnProps>`
  width: 55px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0;
  border-radius: 15px;
  background-color: ${props => (props.isActive ? 'blue' : 'transparent')};

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 960px) {
    font-size: 11px;
    font-weight: 500;
    width: 42px;
    height: 31px;
  }
`;

export const ButtonGroup = styled.div`
  width: 220px;
  margin-left: 2em;
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  justify-content: center;
  margin-top: 20px;

  overflow: hidden;

  @media (max-width: 960px) {
    width: 210px;
    // margin-left: auto;
    // margin-right: auto;
    height: 31px;
  }
`;

const ChartPrice = styled('div')`
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
  margin: 20px 0;
  color: white;
  @media (max-width: 960px) {
    font-size: 24px;
    margin: 10px 0;
  }

  .price {
    font-size: 35px;
  }

  .cont {
    width: 450px;

    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
`;

const ChartAndButtonDiv = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  height: 70px;
`;

const BlockArea = styled('div')``;

const ChartDetailText = styled('div')`
  font-size: 16px;
`;

const Chart = ({
  tabId,
  setTabId,
  data,
  oneDayGraph,
  sevenDayGraph,
  oneMonthGraph,
  oneYearGraph,
  changeIn24h,
  setSelectedPair,
  selectedPair
}: any) => {
  const [currentSymbolPrice, setCurrSymbolPrice] = useState({
    name: null,
    pv: -1,
    amt: '-1'
  });

  const getCurrentCoinPrice = (symbol: string) => {
    axios.get(`${process.env.BINANCE_API}ticker/price?symbol=${symbol}`).then((res: any) => {
      console.log(res.data);
      let time = new Date();
      let h = time.getUTCHours();
      let pm = false;
      if (h >= 12) {
        pm = true;
        h = h - 12;
      }
      let m = time.getUTCMinutes();
      let y = time.getUTCFullYear().toString().substring(2);
      let month = time.toUTCString().substring(8, 12);
      let day = time.getUTCDate();
      let customDate;
      if (pm) {
        if (m >= 10) {
          customDate = h + ':' + m + 'PM ' + day + ' ' + month.toUpperCase() + ' ' + y + ', CET';
        } else {
          customDate = h + ':0' + m + 'PM ' + day + ' ' + month.toUpperCase() + ' ' + y + ', CET';
        }
      } else {
        if (m >= 10) {
          customDate = h + ':' + m + 'AM ' + day + ' ' + month.toUpperCase() + ' ' + y + ', CET';
        } else {
          customDate = h + ':0' + m + 'AM ' + day + ' ' + month.toUpperCase() + ' ' + y + ', CET';
        }
      }

      setCurrSymbolPrice({
        //@ts-ignore
        pv: parseInt(res.data.price),

        name: customDate,
        amt: res.data.price
      });
    });
  };

  useEffect(() => {
    getCurrentCoinPrice(selectedPair.split('/')[0] + selectedPair.split('/')[1]);
  }, [selectedPair]);

  return (
    <>
      {data && (
        <ChartArea>
          <ChartAndButtonDiv>
            <ChartPrice>
              <div className="cont">
                <div className="price">
                  {currentSymbolPrice.pv && currentSymbolPrice.pv !== -1 ? currentSymbolPrice.pv : ''}
                </div>

                <div> {currentSymbolPrice.pv && currentSymbolPrice.pv !== -1 ? selectedPair : 'Loading...'} </div>
                <ChartDetailText
                  style={
                    changeIn24h.indexOf('-') == -1
                      ? { color: '#00C142', marginRight: '10px' }
                      : { color: 'red', marginRight: '10px' }
                  }
                >
                  {changeIn24h != '9999999' ? changeIn24h : 'Loading....'}{' '}
                </ChartDetailText>
              </div>

              <div style={{ color: 'white', fontSize: '13px' }}>{currentSymbolPrice.name}</div>
            </ChartPrice>

            <ButtonGroup>
              <TabBtn
                isActive={tabId == 0}
                onClick={() => {
                  oneDayGraph();
                  setTabId(0);
                }}
              >
                24H
              </TabBtn>
              <TabBtn
                isActive={tabId == 1}
                onClick={() => {
                  sevenDayGraph();
                  setTabId(1);
                }}
              >
                1W
              </TabBtn>
              <TabBtn
                isActive={tabId == 2}
                onClick={() => {
                  oneMonthGraph();
                  setTabId(2);
                }}
              >
                1M
              </TabBtn>
              <TabBtn
                isActive={tabId == 3}
                onClick={() => {
                  oneYearGraph();
                  setTabId(3);
                }}
              >
                1Y
              </TabBtn>
            </ButtonGroup>
          </ChartAndButtonDiv>

          <ResponsiveContainer className="responsive-container">
            <AreaChart data={data}>
              <YAxis tick={false} domain={[data[0].pv - 100, data[data.length - 1].pv + 100]} />
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="30%" stopColor="#27AE60" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#27AE60" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="amt"
                interval={tabId == 2 ? 50 : tabId == 1 ? 24 : tabId == 3 ? 45 : tabId == 4 ? 12 : 50}
                tick={true}
              />
              <Tooltip content={<CustomTooltip changeIn24h={changeIn24h} setCurrSymbolPrice={setCurrSymbolPrice} />} />
              {/* <Tooltip content={<CustomTooltip changeIn24h={changeIn24h} setCurrSymbolPrice={setCurrSymbolPrice}/>}/> */}
              <Area
                type="monotone"
                dataKey="pv"
                strokeWidth="3"
                stroke="#27AE60"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartArea>
      )}
    </>
  );
};

export default Chart;
