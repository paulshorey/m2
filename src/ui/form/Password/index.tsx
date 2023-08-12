import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Eye, EyeClosed } from '@phosphor-icons/react';

type Props = {
  label?: string;
};

export default function FormPassword({ label }: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" size="small">
        {label || 'Password'}
      </InputLabel>
      <OutlinedInput
        size="small"
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                opacity: 0.5,
              }}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}

/* <Button
size="small"
sx={{
  'mt': 1,
  'mb': 1,
  'textTransform': 'none',
  'color': 'primary.main',
  '&:hover': {
    color: 'primary.dark',
  },
}}
>
Forgot password?
</Button> */
