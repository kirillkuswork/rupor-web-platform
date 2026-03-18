import useIsMobile from '@/shareds/hooks/useIsMobile';

interface IBreakpointRenderProps {
  mobile: JSX.Element
  desktop: JSX.Element
}

export const BreakpointRender = ({ mobile, desktop }: IBreakpointRenderProps) => {
  const { isMobile } = useIsMobile();

  if (isMobile) return mobile;

  return desktop;
};
