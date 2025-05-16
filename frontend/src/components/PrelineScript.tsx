'use client';

import { useEffect } from 'react';

export function PrelineScript() {
  useEffect(() => {
    import('preline/preline');
  }, []);
  
  return null;
}