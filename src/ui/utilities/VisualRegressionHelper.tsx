import Box  from '@mui/material/Box';
import { useEffect, useState } from 'react';
// @ts-ignore
import { getQueryParam } from 'src/functions/url';

export default function VisualRegressionHelper() {
  const [debugClient, setDebugClient] = useState<any>(null);
  useEffect(() => {
    if (typeof window === 'object' && !!getQueryParam('qaScreen')) {
      const json = [
        ['width_inner', window.innerWidth],
        ['height_inner', window.innerHeight],
        ['pixel_ratio', window.devicePixelRatio.toFixed(1)],
      ];
      setDebugClient(json);
    }
  }, []);
  if (!debugClient) {
    // IMPORTANT: do not show in production, but only if ?qa=true is in the URL
    return null;
  }
  return (
    <Box
      component="code"
      sx={{
        position:'fixed',
        top:'60px',
        left:'6px',
        zIndex:'100000',
        color:'white',
        textShadow:'0px 0px 10px rgba(0, 0, 0, 1)',
        fontSize:'1rem !important',
        whiteSpace:'pre',
      }}
    >
      {JSON.stringify(debugClient, null, 1)}
    </Box>
  );
}
