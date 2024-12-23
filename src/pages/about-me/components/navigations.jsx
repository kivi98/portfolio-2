import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from 'react';

const NavigationButton = ({ text, isActive, onClick }) => {
  return (
    <ListItem
      component={'button'}
      onClick={onClick}
      sx={{
        color: isActive ? 'white' : 'text.dark',
        backgroundColor: isActive ? 'secondary.main' : 'primary.main',
        cursor: 'pointer',
        mx: 0,
        py: '0.2rem',
        width: '100%',
        mb: '0.2rem',
        borderRadius: 2,
        border: 'solid 1px transparent',
      }}
    >
      <ListItemText primary={text} />
      <ListItemIcon>
        <Box
          sx={{
            color: isActive ? 'white' : 'text.dark',
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            p: 0,
            m: 0,
          }}
        >
          <KeyboardArrowRightIcon />
        </Box>
      </ListItemIcon>
    </ListItem>
  );
};

export const Navigations = ({
  sectionRefs,
  activeSection,
  scrollToSection,
}) => {
  return (
    <Card
      sx={{
        p: 2,
        minWidth: 200,
        backgroundColor: 'transparentLevels.2',
        display: { xs: 'none', md: 'block' },
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 2,
      }}
    >
      <List>
        {sectionRefs.map(({ id, text, ref }) => (
          <NavigationButton
            key={id}
            text={text}
            isActive={activeSection === id}
            onClick={() => scrollToSection(ref, 145)}
          />
        ))}
      </List>
    </Card>
  );
};

export default Navigations;
