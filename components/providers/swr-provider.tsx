import React from 'react';
import { SWRConfig } from 'swr';
import { swrConfig } from '@/lib/swr';

interface SWRProviderProps {
  children: React.ReactNode;
}

const SWRProvider = ({ children }: SWRProviderProps) => {
  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  );
};

export default SWRProvider; 