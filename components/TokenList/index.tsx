/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import _ from 'lodash';
import { useAssetsContext } from '../../contexts/assets';
import Icon from '../Icon';

type Props = {
  onItemClick: (value: string) => void;
  selectedAddress: string;
};

const TokenListContainer = styled.div`
  position: absolute;
  top: 15%;
  background: linear-gradient(
    190.57deg,
    rgba(255, 255, 255, 0.56) 19.25%,
    rgba(248, 248, 255, 0.71) 54.39%,
    rgba(255, 255, 255, 0.59) 90.02%
  );
  box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
  backdrop-filter: blur(19px);
  width: 400px;
  min-height: 500px;
  border-radius: 10px;
  z-index: 10;
  overflow: hidden;
`;

const TokenWrapper = styled.div`
  padding: 20px 0px;
  width: 100%;
`;

const TokenHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 12px;

  .headertext {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.7);
    i {
      cursor: pointer;
    }
  }
  .tokenSearch {
    border-radius: 20px;

    outline: none;
    background: #fcfcfc;
    border: 1px solid #d8d8d8;
    display: flex;
    padding: 12px 20px;
    input {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: rgba(0, 0, 0, 0.8);
      letter-spacing: 0.05em;
      font-size: 16px;
    }
    i {
      color: #ccc;
      margin-top: 3px;
    }
  }
`;

const TokenListWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  margin-top: 30px;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  scrollbar-width {
    width: 0;
  }
`;
const Tokenlist = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
`;

const TokenlistItem = styled.button`
  margin: 8px 0;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s linear;
  padding: 4px 8px;
  border: none;
  background: transparent;
  text-align: left;

  &:hover {
    background: #4500a0;
    color: rgba(255, 255, 255, 0.7);
  }

  .img {
    margin-right: 8px;
    display: flex;
    img {
      width: 25px;
      height: 25px;
      object-fit: contain;
    }
  }
  .tokenName {
    display: flex;
    flex-direction: column;

    span {
      &:nth-child(1) {
        color: #350870;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
      }
      &:nth-child(2) {
        color: #9978c5;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
`;

const TokenList = ({ selectedAddress, onItemClick }: Props) => {
  const { assets } = useAssetsContext();
  return (
    <>
      <TokenListContainer>
        <TokenWrapper>
          <TokenHeader>
            <div className="headertext">
              <h2>Select Token</h2>
              <Icon iconType="solid" name="times-circle" width="20px" height="20px" fontSize="20px" />
            </div>
            <div className="tokenSearch">
              <input type="text" placeholder="Search for token" />
              <Icon iconType="solid" name="search" width="20px" height="20px" fontSize="16px" />
            </div>
          </TokenHeader>
          <TokenListWrapper>
            <Tokenlist>
              {!!assets &&
                Object.keys(assets).length > 0 &&
                _.map(Object.keys(assets['0x61']), key => (
                  <TokenlistItem key={key} disabled={key === selectedAddress} onClick={() => onItemClick(key)}>
                    <div className="img">
                      <img
                        src={`http://${assets['0x61'][key].image}`}
                        alt={assets['0x61'][key].name}
                        width="25px"
                        height="25px"
                      />
                    </div>
                    <div className="tokenName">
                      <span>{assets['0x61'][key].symbol}</span>
                      <span>{assets['0x61'][key].name}</span>
                    </div>
                  </TokenlistItem>
                ))}
            </Tokenlist>
          </TokenListWrapper>
        </TokenWrapper>
      </TokenListContainer>
    </>
  );
};

export default TokenList;
