import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import './style.css'

function SidebarItem({ name, children, onSelect, depthStep = 10, depth = 0, isDirectory, ...rest }) {
  return (
    <>
      <ListItem button dense onClick={() => onSelect(rest.id)} {...rest}>
        <ListItemText style={{ paddingLeft: depth * depthStep }}>
          <span>{name}</span>
        </ListItemText>
      </ListItem>
      {isDirectory ? (
        <List disablePadding dense>
          {children.map((subItem) => (
            <SidebarItem
              key={subItem.name}
              depth={depth + 1}
              depthStep={depthStep}
              onSelect={onSelect}
              {...subItem}
            />
          ))}
        </List>
      ) : null}
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
