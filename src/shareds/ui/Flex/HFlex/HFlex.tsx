import React from 'react';
import Flex, { FlexProps } from '@/shareds/ui/Flex/Flex/Flex';

export type HFlexProps = Omit<FlexProps, 'direction'>;

export const HFlex = (props: HFlexProps) => <Flex {...props} direction="row" />;
