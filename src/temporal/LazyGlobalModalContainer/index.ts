import dynamic from 'next/dynamic';

export const LazyGlobalModalContainer = dynamic(() => import('./GlobalModalContainer'));
