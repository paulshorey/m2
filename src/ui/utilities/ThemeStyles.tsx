import { Box } from '@mui/system';

export default function ThemeStyles({ children }: any) {
  return (
    <Box
      sx={{
        '.Mui-active': {},
        '.Mui-checked': {},
        '.Mui-completed': {},
        '.Mui-disabled': {},
        '.Mui-error': {},
        '.Mui-expanded': {},
        '.Mui-focusVisible': {},
        '.Mui-focused': {},
        '.Mui-readOnly': {},
        '.Mui-required': {},
        '.Mui-selected': {},
        ...styledInputs,
      }}
    >
      {children}
    </Box>
  );
}

const styles = {
  input: {
    small: {
      fontSize: '0.75rem',
      lineHeight: '1.5rem',
      height: '1.5rem',
      py: '0',
      px: '0',
      // boxShadow: '0 0 1px 0 orange',
      minWidth: 'auto',
    },
  },
};
const styledInputs = {
  '.MuiFormControl-root': {
    width: '100%',
    p: '0',
    m: '0',
  },
  '.MuiInputBase-root': {
    'pl': '0.75rem',
    'pr': '0.5rem',
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--mui-palette-primary-main)',
      },
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px !important',
  },
  '.MuiInputAdornment-root': {
    p: '0',
    m: '0',
  },
  '.MuiInputBase-input': {
    ...styles.input.small,
  },
  '.MuiInputLabel-root': {
    transformOrigin: 'top left',
    px: '0.75rem',
    zIndex: -1,
  },
  '.MuiInputLabel-root.MuiInputLabel-shrink': {
    fontSize: '0.75rem',
    // transform: 'none',
  },
  '.MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
    ...styles.input.small,
    transform: 'none',
    px: '0.75rem',
  },
  '.MuiInputLabel-shrink': {
    transformOrigin: 'top left',
    top: '-0.04rem',
    left: '-0.4rem',
    // fontSize: '0.75rem',
  },
  '.MuiInputBase-multiline textarea': {
    lineHeight: '1.5',
  },
  '.MuiOutlinedInput-notchedOutline legend span': {
    // display: 'block',
    // transformOrigin: 'top left',
    // transform: 'scale(1125)',
  },
  '.MuiInputBase-input.MuiOutlinedInput-input': {
    textIndent: '0.125rem',
  },
  '.MuiButton-root': {
    textTransform: 'none',
    ...styles.input.small,
    px: '0.75rem',
    span: {
      color: 'white',
    },
  },
  '.MuiIconButton-sizeSmall': {
    fontSize: '1rem',
    svg: {
      position: 'relative',
      top: '-0.025rem',
    },
  },
};
