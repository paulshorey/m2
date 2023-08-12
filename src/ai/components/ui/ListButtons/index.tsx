import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconOne from '@phosphor-icons/react/dist/icons/Package';
import IconTwo from '@phosphor-icons/react/dist/icons/EnvelopeSimple';

export default function ListButtons() {
  return (
    <List>
      {[
        'Inbox',
        'Starred',
        'Send email',
        'Drafts',
        null,
        'All mail',
        'Trash',
        'Spam',
      ].map((text, index) =>
        !text ? (
          <Divider />
        ) : (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <IconOne /> : <IconTwo />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ),
      )}
    </List>
  );
}
