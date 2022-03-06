import Image from 'next/image';
import React, { useState } from 'react';
type Props = {};
import styled from 'styled-components';
import Icon from '../Icon';
const eth = '/eth.svg';
const polygon = '/polygon.svg';
const optimism = '/optimism.svg';
const arbitrum = '/arbitrum.svg';

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

const Dropdown = (props: Props) => {
  const [isOpen, SetIsDropdownOpen] = useState(false);
  const toggling = () => SetIsDropdownOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [chainIcon, setChainIcon] = useState<string>(eth);
  const [chainiconAlt, setChainIconAlt] = useState<string>('Ethereum Icon');

  const options = [
    {
      imgDir: eth,
      optionChoice: 'Ethereum',
      alt: 'Ethereum Icon'
    },
    {
      imgDir: polygon,
      optionChoice: 'Polygon',
      alt: 'Polygon Icon'
    },
    {
      imgDir: optimism,
      optionChoice: 'Optimism',
      alt: 'Optimism Icon'
    },
    {
      imgDir: arbitrum,
      optionChoice: 'Arbitrum',
      alt: 'Arbitrum Icon'
    }
  ];

  const onOptionClick = (value: string) => () => {
    setSelectedOption(value);
    SetIsDropdownOpen(false);
    if (value === 'Ethereum') {
      setChainIcon(eth);
      setChainIconAlt('Ethereum Icon');
    } else if (value === 'Polygon') {
      setChainIcon(polygon);
      setChainIconAlt('Polygon Icon');
    } else if (value === 'Optimism') {
      setChainIcon(optimism);
      setChainIconAlt('Optimism Icon');
    } else if (value === 'Arbitrum') {
      setChainIcon(arbitrum);
      setChainIconAlt('Arbitrum Icon');
    }
  };

  return (
    <div className="dropdown">
      <DropdownContainer>
        <DropdownHeader onClick={toggling}>
          <Image src={chainIcon} alt={chainiconAlt} className="chain_icon" width="20px" height="20px" />
          <div>{selectedOption || 'Ethereum'}</div>
          <Icon
            iconType="solid"
            name="chevron-down"
            width="12px"
            height="6px"
            fontSize="12px"
            style={{ marginLeft: '10px' }}
          />
        </DropdownHeader>
        {isOpen && (
          <DropdownListContainer>
            <Text>Select a network</Text>
            <DropdownList>
              {options.map(option => (
                <ListItem onClick={onOptionClick(option.optionChoice)} key={Math.random()}>
                  <IconChain src={option.imgDir} alt={option.alt} />
                  {option.optionChoice}
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
