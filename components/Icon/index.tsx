import React from 'react';
import styled from 'styled-components';
import { CustomComponentProps } from '../props';

type Props = {
  name: string;
  iconType: 'regular' | 'solid' | 'brands' | 'light' | 'duotone' | 'thin';
};

const CustomIcon = styled('i')<CustomComponentProps>`
  text-align: center;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.fontSize};
`;

const Icon = (props: Props & CustomComponentProps) => (
  <CustomIcon {...props} className={`fa-${props.iconType} fa-${props.name}`} onClick={props.onClick} />
);

export default Icon;
