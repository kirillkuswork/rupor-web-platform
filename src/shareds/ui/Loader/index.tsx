import clsx from 'clsx';

export const Loader = ({ className = '' }: { className?: string }) => (
  <div className={clsx('w-10 h-10 mr-4 squircle shrink-0', className)} />
);
