import Image from 'next/image';
import styled from 'styled-components';
import Icon from '../Icon';
const Btc = '/btc.svg';
const TokenListContainer = styled.div`
  position: absolute;
  top: 15%;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
  backdrop-filter: blur(19px);
  width: 400px;
  min-height: 500px;
  border-radius: 10px;
  z-index: 10;
  overflow: hidden;
`;
const TokenWrapper = styled.div`
  padding: 20px 30px;
  width: 100%;
`;
const TokenHeader = styled.div`
  display: flex;
  flex-direction: column;

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
  display: flex;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  scrollbar-width {
    width: 0;
  }
`;
const Tokenlist = styled.ul`
  list-style-type: none;
  width: 100%;
`;
const TokenlistItem = styled.li`
  margin: 8px 0;
  width: 108%;
  margin-left: -30px;
  display: flex;
  align-items: center;
  cursor: pointer;

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
const TokenList = () => {
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
              <TokenlistItem>
                <div className="img">
                  <Image src={Btc} alt="bitcoin" width="25px" height="25px" />
                </div>
                <div className="tokenName">
                  <span>BTC</span>
                  <span>Bitcoin</span>
                </div>
              </TokenlistItem>
            </Tokenlist>
          </TokenListWrapper>
        </TokenWrapper>
      </TokenListContainer>
    </>
  );
};

export default TokenList;
