import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { CustomComponentProps } from '../props';

type Props = {
  iconType: 'regular' | 'solid' | 'brands' | 'light' | 'duotone' | 'thin';
  name: string;
  click?: (ev: Event) => void;
  disabled?: boolean;
};

const CustomButton = styled('button')<CustomComponentProps>`
  width: ${props => props.width || '145px'};
  height: ${props => props.height || '38px'};
  background: ${props => props.background || 'transparent'};
  border-radius: ${props => props.borderRadius || '5px'};
  color: ${props => props.color || '#fff'};
  border: ${props => props.border || 'none'};
  margin-top: ${props => props.marginTop};
  cursor: pointer;
  font-size: ${props => props.fontSize || '8px'};
  text-align: center;
`;

const IconButton = (props: Props & CustomComponentProps) => (
  <CustomButton {...(props as CustomComponentProps)} onClick={(props as Props).click} disabled={props.disabled}>
    <Icon iconType={props.iconType} name={props.name} />
  </CustomButton>
);

export default IconButton;
