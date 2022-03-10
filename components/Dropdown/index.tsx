import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Icon from '../Icon';
import { supportedChainIdsToNetworkNameMap } from '../../global/maps';

const chainIdToImageMap: { [key: number]: string } = {
  0x3: '/ethereum.svg',
  0x61: '/binance.svg',
  0x13881: '/polygon.svg',
  0xa869: '/avalanche.svg',
  0xfa2: '/fantom.svg'
};

const DropdownContainer = styled('div')`
  color: #fff;
  border-radius: 5px;
  width: 10.5em;
`;
const DropdownHeader = styled('div')`
  cursor: pointer;
  border-radius: 8px;
  background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
  box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
  height: 45px;
  backdrop-filter: blur(19px);
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
  color: #fff;
  background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
  box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
  backdrop-filter: blur(19px);
  border-radius: 10px;
  padding: 10px 0;
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

  &:hover {
    background: #4500a0;
    color: rgba(255, 255, 255, 0.7);
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

type Props = {
  onChainSwitch?: (id: string) => void;
};

const Dropdown = ({ onChainSwitch }: Props) => {
  const [isOpen, setIsDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<number>(0x61);
  const [chainiconAlt, setChainIconAlt] = useState<string>('Ethereum Icon');

  const toggle = () => setIsDropdownOpen(!isOpen);

  return (
    <div className="dropdown">
      <DropdownContainer>
        <DropdownHeader onClick={toggle}>
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
            <div style={{ flexGrow: 1, flexBasis: '20%', marginLeft: 2, marginRight: 2 }}>
              <Image
                src={chainIdToImageMap[selectedChain]}
                alt={selectedChain.toString()}
                className="chain_icon"
                width="18px"
                height="18px"
              />
            </div>
            <div style={{ flexGrow: 1, flexBasis: '60%', marginLeft: 2, marginRight: 2 }}>
              <span style={{ fontSize: 16 }}>{supportedChainIdsToNetworkNameMap[selectedChain]}</span>
            </div>
            <div style={{ flexGrow: 1, flexBasis: '20%', marginLeft: 2, marginRight: 2 }}>
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
                    setSelectedChain(parseInt(key));
                    setIsDropdownOpen(false);
                    if (onChainSwitch) onChainSwitch(key);
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
