'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressProvider = ({ children }: { children : React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#0070f3"
        options={{ showSpinner: false }}
        shallowRouting      
        
      />
    </>
  );
};

export default ProgressProvider;
