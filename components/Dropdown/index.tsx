import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Icon from '../Icon';
import { supportedChainIdsToNetworkNameMap, chainIdToImageMap } from '../../global/maps';
import { useWeb3Context } from '../../contexts/web3';

const DropdownContainer = styled('div')`
  color: #000;
  border-radius: 5px;
  width: 10.5em;
  cursor: pointer;
`;

const DropdownHeader = styled('div')`
  cursor: pointer;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  height: 45px;
  backdrop-filter: blur(1px);
  /* padding: 10px; */
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  &:div {
    display: flex;
  }
  .chain_icon {
    margin: 0px;
    display: flex;
    align-items: center;
    width: 15px;
    height: 15px;
  }
`;

const DropdownListContainer = styled('div')`
  color: #000;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
  backdrop-filter: blur(19px);
  border-radius: 10px;
  overflow: hidden;
  width: 15.5em;
  position: absolute;
  /* top: 10%; */
  margin-top: 1.5rem;
  z-index: 999;
`;

const DropdownList = styled('ul')`
  list-style-type: none;
`;
const ListItem = styled('li')`
  cursor: pointer;
  font-weight: 400;
  padding: 15px 0;
  margin: 0 0 0 -40px;
  display: flex;
  align-items: center;
  transition: all 0.3s linear;
  backdrop-filter: blur(19px);

  &:last-child {
    margin-bottom: -16px;
  }
  &:hover {
    background: #4500a0;
    color: rgba(255, 255, 255, 1);
  }
`;

const Text = styled('p')`
  text-align: left;
  margin-left: 20px;
  font-size: 16px;
`;

const IconChain = styled('img')`
  margin: 0 15px;
  width: 25px;
  height: 25px;
  object-fit: contain;
`;

const Dropdown = () => {
  const [isOpen, setIsDropdownOpen] = useState(false);
  const { isActive, chainId, localChainId, switchChain } = useWeb3Context();

  const toggle = () => setIsDropdownOpen(!isOpen);

  return (
    <div className="dropdown">
      <DropdownContainer>
        <DropdownHeader style={{ pointerEvents: !isActive ? 'none' : 'auto' }} onClick={isActive ? toggle : undefined}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                flexGrow: 1,
                flexBasis: '20%',
                marginLeft: 2,
                marginRight: 2
              }}
            >
              <Image
                src={chainIdToImageMap[(chainId as number) || (localChainId as number)]}
                alt={(chainId || localChainId)?.toString()}
                className="chain_icon"
                width="18px"
                height="18px"
              />
            </div>
            <div
              style={{
                flexGrow: 1,
                flexBasis: '60%',
                marginLeft: 2,
                marginRight: 2
              }}
            >
              <span style={{ fontSize: 16 }}>
                {supportedChainIdsToNetworkNameMap[(chainId as number) || (localChainId as number)]}
              </span>
            </div>
            <div
              style={{
                flexGrow: 1,
                flexBasis: '20%',
                marginLeft: 2,
                marginRight: 2
              }}
            >
              <Icon iconType="solid" name="chevron-down" width="12px" height="12px" fontSize="14px" />
            </div>
          </div>
        </DropdownHeader>
        {isOpen && (
          <DropdownListContainer>
            <Text>Select a network</Text>
            <DropdownList>
              {_.map(Object.keys(supportedChainIdsToNetworkNameMap), key => (
                <ListItem
                  onClick={() => {
                    switchChain(`0x${parseInt(key).toString(16)}`);
                    setIsDropdownOpen(false);
                  }}
                  key={key}
                >
                  <IconChain src={chainIdToImageMap[parseInt(key)]} alt={key} />
                  {supportedChainIdsToNetworkNameMap[parseInt(key)]}
                </ListItem>
              ))}
            </DropdownList>
          </DropdownListContainer>
        )}
      </DropdownContainer>
    </div>
  );
};

export default Dropdown;
