import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TreeItem from './TreeItem';

export default function SidebarTreeMenu() {
  return (
    <TreeView
      // aria-label="gmail"
      // defaultExpanded={['3']}
      // defaultCollapseIcon={<ArrowDropDownIcon />}
      // defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ flexGrow: 1, maxWidth: 240, height: '100%' }}
    >
      <TreeItem nodeId="1" label="All Mail" />
      <TreeItem nodeId="2" label="Trash" />
      <TreeItem nodeId="3" label="Categories">
        <TreeItem nodeId="5" label="Social" info="90" />
        <TreeItem nodeId="6" label="Updates" info="2,294" />
        <TreeItem nodeId="7" label="Forums" info="3,566" />
        <TreeItem nodeId="8" label="Promotions" info="733" />
      </TreeItem>
      <TreeItem nodeId="14" label="History">
        <TreeItem nodeId="5" label="Social" info="90" />
        <TreeItem nodeId="6" label="Updates" info="2,294" />
        <TreeItem nodeId="7" label="Forums" info="3,566" />
        <TreeItem nodeId="8" label="Promotions" info="733" />
      </TreeItem>
      <TreeItem nodeId="24" label="History2">
        <TreeItem nodeId="5" label="Social" info="90" />
        <TreeItem nodeId="6" label="Updates" info="2,294" />
        <TreeItem nodeId="7" label="Forums" info="3,566" />
        <TreeItem nodeId="8" label="Promotions" info="733" />
      </TreeItem>
      <TreeItem nodeId="34" label="History3">
        <TreeItem nodeId="5" label="Social" info="90" />
        <TreeItem nodeId="6" label="Updates" info="2,294" />
        <TreeItem nodeId="7" label="Forums" info="3,566" />
        <TreeItem nodeId="8" label="Promotions" info="733" />
      </TreeItem>
    </TreeView>
  );
}
