import React from 'react';
import styled from 'styled-components';
import { CustomComponentProps } from '../props';

type Props = {
  title: string;
  click?: (ev: Event) => void;
  disabled?: boolean;
};

const CustomButton = styled('button')<CustomComponentProps>`
  width: ${props => props.width || '145px'};
  height: ${props => props.height || '38px'};
  background: ${props => props.background || 'rgba(69, 0, 160, 1)'};
  border-radius: ${props => props.borderRadius || '5px'};
  color: ${props => props.color || '#fff'};
  border: none;
  margin-top: ${props => props.marginTop};
  cursor: pointer;
`;

const Button = (props: Props & CustomComponentProps) => (
  <CustomButton {...(props as CustomComponentProps)} onClick={(props as Props).click} disabled={props.disabled}>
    {(props as Props).title}
  </CustomButton>
);

export default Button;
