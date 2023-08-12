import Box from '@mui/material/Box';
import MuiTreeItem, {
  type TreeItemProps as MuiTreeItemProps,
} from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';

type TreeItemProps = MuiTreeItemProps & {
  info?: string | React.ReactNode;
  label: string | React.ReactNode;
};

export default function TreeItem(props: TreeItemProps) {
  const { info, label, ...rest } = props;
  return (
    <MuiTreeItem
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {label}
          </Typography>
          <Typography variant="caption">{info}</Typography>
        </Box>
      }
      {...rest}
    />
  );
}
