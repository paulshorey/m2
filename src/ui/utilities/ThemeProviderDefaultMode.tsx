import { useColorScheme } from '@mui/material/styles';

export default function () {
  const { mode, setMode } = useColorScheme();
  if (mode === 'dark') {
    return null;
  }
  console.log('Switching UI from ' + mode + ' to dark mode...');
  setMode('dark');
  return null;
}
