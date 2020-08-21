import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './style.css'

function SidebarItem({ name, children, onSelect, isDirectory, ...rest }) {
  return (
    <>
    {
      isDirectory ?
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography>
            {name}
          </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding dense>
              {children.map((subItem) => (
                <SidebarItem
                  key={subItem.name}
                  onSelect={onSelect}
                  {...subItem}
                />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      : <ListItem button dense onClick={() => onSelect(rest.id)} {...rest}>
          <ListItemText>
            <span>{name}</span>
          </ListItemText>
        </ListItem>
    }
    </>
  )
}

function Sidebar({ items, depthStep, depth, onSelect }) {
  return (
    <div className="sidebar">
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <SidebarItem
            key={`${sidebarItem.name}${index}`}
            depthStep={depthStep}
            depth={depth}
            onSelect={onSelect}
            {...sidebarItem}
          />
        ))}
      </List>
    </div>
  )
}

export default Sidebar
