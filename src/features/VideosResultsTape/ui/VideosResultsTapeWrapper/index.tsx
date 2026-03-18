/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper } from '@/shareds/ui';

interface IProps {
  children?: any;
}

export const VideosResultsTapeWrapper = ({ children }: IProps) => (
  <Paper className="flex flex-col grow mt-6 md:mt-4 !mb-0">
    {children}
  </Paper>
);
