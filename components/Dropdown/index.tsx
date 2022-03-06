import React, { useState } from "react";
type Props = {};
import styled from "styled-components";
import Icon from '../Icon'
const eth = "../eth.svg";
const polygon = "../polygon.svg";
const optimism = "../optimism.svg";
const arbitrum = "../arbitrum.svg";


const DropdownContainer = styled("div")`
    color:#fff;
    border-radius:5px;
    width:10.5em;
`;
const DropdownHeader = styled("div")`
    cursor:pointer;
    border-radius:8px;
    background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
    box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
    height:45px;
    backdrop-filter: blur(19px);
    padding:10px;
    display:flex;
    flex-direction:row;
    align-items:baseline;
    .chain_icon{
        margin:0 15px;
        width:15px;
        height:15px;
    }
`;
const DropdownListContainer = styled("div")`
    color:#fff;
    background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
    box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
    backdrop-filter: blur(19px);
    border-radius:5px;
    padding:10px 0;
    width:15.5em;
    position:absolute;
    top:8%;
    margin-top: 1.5rem;
    z-index:999;
`;
const DropdownList = styled("ul")``;
const ListItem = styled("li")`
    cursor:pointer;
    list-style:none;
    font-weight:400;
    padding:15px 0;
    margin:0;
`;

const Text = styled("p")`
    text-align:left;
    margin-left:20px;
    font-size:18px;
`

const IconChain = styled("img")`
    margin:0 15px;
    width:15px;
    height:15px;
`


const Dropdown = (props: Props) => {
    const [isOpen, SetIsDropdownOpen] = useState(false);
    const toggling = () => SetIsDropdownOpen(!isOpen);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [chainIcon, setChainIcon] = useState<string>(eth);
    const [chainiconAlt, setChainIconAlt] = useState<string>('Ethereum Icon');

    const options = [
        {
            imgDir:eth,
            optionChoice:'Ethereum',
            alt:'Ethereum Icon'
        },
        {
            imgDir:polygon,
            optionChoice:'Polygon',
            alt:'Polygon Icon'
        },
        {
            imgDir:optimism,
            optionChoice:'Optimism',
            alt:'Optimism Icon'
        },
        {
            imgDir:arbitrum,
            optionChoice:'Arbitrum',
            alt:'Arbitrum Icon'
        }
    ];

    const onOptionClick = (value: string) => () => {
        setSelectedOption(value);
        SetIsDropdownOpen(false);
        if (value === "Ethereum") {
            setChainIcon(eth);
            setChainIconAlt("Ethereum Icon");
        } else if (value === "Polygon") {
            setChainIcon(polygon);
            setChainIconAlt("Polygon Icon");
        } else if (value === "Optimism") {
            setChainIcon(optimism);
            setChainIconAlt("Optimism Icon");
        } else if (value === "Arbitrum") {
            setChainIcon(arbitrum);
            setChainIconAlt("Arbitrum Icon");
        }
    }


    return (
        <div className="dropdown">
            <DropdownContainer>
                <DropdownHeader
                    onClick={toggling}
                >
                    <div>
                        <img src={chainIcon} alt={chainiconAlt} className="chain_icon" />
                    </div>
                    <div>
                        {selectedOption || "Ethereum"}
                    </div>
                    <div>
                        <Icon iconType="solid" name="chevron-down" width="12px" height="6px" fontSize="12px" style={{ marginLeft: "10px" }} />
                    </div>
                </DropdownHeader>
                {isOpen && (
                    <DropdownListContainer>
                        <Text>Select a network</Text>
                        <DropdownList>
                            {options.map(option => (
                                <ListItem onClick={onOptionClick(option.optionChoice)} key={Math.random()} >
                                    <IconChain src={option.imgDir} alt={option.alt} />
                                    {option.optionChoice}
                                </ListItem>
                            ))}
                        </DropdownList>
                    </DropdownListContainer>
                )}
            </DropdownContainer>
        </div>
    )
}

export default Dropdown;