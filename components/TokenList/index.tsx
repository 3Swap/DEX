/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import _ from 'lodash';
import { useAssetsContext } from '../../contexts/assets';
import Icon from '../Icon';
import { useWeb3Context } from '../../contexts/web3';
import { useState } from 'react';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import Spinner from '../Spinner';
import { importToken as importAsset } from '../../redux/assetsSlice';
import { useToastContext } from '../../contexts/toast';
import { Fetcher } from '3swap-sdk';

type Props = {
  onItemClick: (value: string) => void;
  selectedAddresses: Array<string>;
  onClose: () => void;
};

const TokenListContainer = styled.div`
  position: absolute;
  top: 15%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
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
  padding: 10px 12px;

  .headertext {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.7);
    i {
      cursor: pointer;
      position: absolute;
      top: 15px;
      right: 20px;
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
  height: 300px;
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
  .import-token-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
`;

const TokenlistItem = styled.button`
  margin: 3px 0;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s linear;
  padding: 4px 20px;
  border: none;
  background: transparent;
  text-align: left;
  transition: all 0.5s linear;
  &:hover {
    background: #4500a0;
    transition: all 0.5s linear;
    color: rgba(255, 255, 255, 0.7);
    .tokenName {
      span {
        &:nth-child(1),
        :nth-child(2) {
          color: #fff;
        }
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    .tokenName {
      span {
        &:nth-child(1) {
          color: #4500a0;
        }
        &:nth-child(2) {
          color: #9978c5;
        }
      }
    }
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

const TokenList = ({ selectedAddresses, onItemClick, onClose }: Props) => {
  const { assets } = useAssetsContext();
  const { chainId, localChainId } = useWeb3Context();
  const [searchItem, setSearchItem] = useState<string>('');
  const [isImporting, setIsImporting] = useState(false);
  const { showErrorToast, showSuccessToast } = useToastContext();
  const dispatch = useDispatch();

  const importToken = () => {
    setIsImporting(true);

    try {
      Fetcher.fetchTokenData(localChainId as number, searchItem)
        .then(token => {
          setIsImporting(false);
          dispatch(
            importAsset({
              name: token.name(),
              symbol: token.symbol(),
              decimals: token.decimals(),
              image: '/placeholder.svg',
              chainId: `0x${(localChainId as number).toString(16)}`,
              contractAddress: searchItem
            })
          );
          showSuccessToast(
            <>
              <span>Successfully imported token!</span>
            </>,
            5
          );
        })
        .catch(error => {
          setIsImporting(false);
          showErrorToast(
            <>
              <span>
                {error.message}
                {''}!
              </span>
            </>,
            5
          );
        });
    } catch (error: any) {
      setIsImporting(false);
      showErrorToast(
        <>
          <span>
            {error.message}
            {''}!
          </span>
        </>,
        5
      );
    }
  };

  return (
    <>
      <TokenListContainer>
        <TokenWrapper>
          <TokenHeader>
            <div className="headertext">
              <h2>Select Token</h2>
              <Icon iconType="solid" name="times-circle" width="20px" height="20px" fontSize="20px" onClick={onClose} />
            </div>
            <div className="tokenSearch">
              <input
                type="text"
                onChange={ev => setSearchItem(ev.target.value)}
                value={searchItem}
                placeholder="Paste token address"
              />
              <Icon iconType="solid" name="search" width="20px" height="20px" fontSize="16px" />
            </div>
          </TokenHeader>
          <TokenListWrapper>
            <Tokenlist>
              {!!assets &&
                Object.keys(assets).length > 0 &&
                searchItem.trim().length > 0 &&
                Object.keys(assets[`0x${(chainId || localChainId)?.toString(16)}`]).filter(val =>
                  val.toLowerCase().includes(searchItem.toLowerCase())
                ).length === 0 && (
                  <div className="import-token-container">
                    <div style={{ flexBasis: '30%', flexGrow: 1, margin: 4 }}>
                      <span style={{ fontSize: 20, fontWeight: 'bold' }}>Asset not found</span>
                    </div>
                    <div style={{ flexBasis: '60%', flexGrow: 1, margin: 4 }}>
                      <Button
                        border="2px solid #4500a0"
                        title="Import Asset"
                        height="40px"
                        color="#4500a0"
                        fontSize="16px"
                        click={importToken}
                      />
                    </div>
                    <div style={{ flexBasis: '10%', flexGrow: 1, margin: 4 }}>{isImporting && <Spinner />}</div>
                  </div>
                )}
              {!!assets &&
                Object.keys(assets).length > 0 &&
                _.map(
                  Object.keys(assets[`0x${(chainId || localChainId)?.toString(16)}`]).filter(val => {
                    if (searchItem.trim().length > 0) return val.toLowerCase().includes(searchItem.toLowerCase());
                    else return val;
                  }),
                  key => (
                    <TokenlistItem
                      key={key}
                      disabled={selectedAddresses.includes(key)}
                      onClick={() => onItemClick(key)}
                    >
                      <div className="img">
                        <img
                          src={`${assets[`0x${(chainId || localChainId)?.toString(16)}`][key].image}`}
                          alt={assets[`0x${(chainId || localChainId)?.toString(16)}`][key].name}
                          width="25px"
                          height="25px"
                        />
                      </div>
                      <div className="tokenName">
                        <span>{assets[`0x${(chainId || localChainId)?.toString(16)}`][key].symbol}</span>
                        <span>{assets[`0x${(chainId || localChainId)?.toString(16)}`][key].name}</span>
                      </div>
                    </TokenlistItem>
                  )
                )}
            </Tokenlist>
          </TokenListWrapper>
        </TokenWrapper>
      </TokenListContainer>
    </>
  );
};

export default TokenList;
