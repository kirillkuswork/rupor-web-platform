import React from 'react';
import Flex, { FlexProps } from '../Flex/Flex';

export type VFlexProps = Omit<FlexProps, 'direction'>;

export const VFlex = (props: VFlexProps) => <Flex {...props} direction="column" />;
