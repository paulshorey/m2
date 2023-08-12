import Box from '../../containers/Block';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';

type Props = {
  children: string | React.ReactNode;
  label?: string | React.ReactNode;
  sx?: TooltipProps['sx'];
  above?: boolean;
  below?: boolean;
};

export function Tooltip({ children, label = '?', sx, above, below }: Props) {
  return (
    <MuiTooltip
      arrow
      slotProps={{
        tooltip: {
          sx: { marginTop: '7px !important' },
        },
      }}
      title={<div>{children}</div>}
    >
      <Box
        data-color="subtle"
        sx={{
          fontFamily: 'monospace',
          zIndex: '1000',
          fontSize: '0.67rem',
          transform: 'scaleY(0.875)',
          cursor: 'pointer',
          lineHeight: '0.75rem',
          position: 'absolute',
          top: above ? '-0.75rem' : below ? undefined : '0.1875rem',
          bottom: below ? '-0.75rem' : undefined,
          right: above || below ? '-0.25rem' : '0.0875rem',
          borderRadius: '50%',
          width: '0.75rem',
          height: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(var(--mui-palette-common-onBackgroundChannel)/0.7)',
          ...sx,
        }}
      >
        {label}
      </Box>
    </MuiTooltip>
  );
}

export default Tooltip;

/* <Tooltip
    id="tiny-bottom-left-tooltip"
    title={false ? undefined : `click to show advanced options`}
    placement="right"
    arrow
    open={ui.enableAdvancedOptionsTooltip ? tooltipOpen : false}
    sx={{
      label: 'TOOLTIP-EXPAND-ADVANCED-OPTIONS',
      '*': {
        fontSize: '0.563rem !important',
        padding: '0 !important',
      },
    }}
  >
    <span>Show tooltip</span>
  </Tooltip> */
