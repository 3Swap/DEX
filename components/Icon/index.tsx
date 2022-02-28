import React from 'react';
import styled from 'styled-components';
import { CustomComponentProps } from '../props';

type Props = {
  name: string;
  iconType: 'regular' | 'solid' | 'brands' | 'light' | 'duotone' | 'thin';
};

const CustomIcon = styled('i')<CustomComponentProps>`
  width: ${props => props.width || '20px'};
  height: ${props => props.height || '20px'};
  font-size: ${props => props.fontSize || '20px'};
`;

const Icon = (props: Props & CustomComponentProps) => (
  <CustomIcon {...props} className={`fa-${props.iconType} fa-${props.name}`} />
);

export default Icon;
