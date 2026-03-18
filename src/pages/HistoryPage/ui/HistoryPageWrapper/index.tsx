import { ReactNode } from 'react';
import { HistoryHeader } from '../HistoryHeader';

export const HistoryPageWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col h-full">
    <HistoryHeader />
    {children}
  </div>
);
