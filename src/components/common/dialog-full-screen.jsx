import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogFullScreen = ({ open, onClose, children, content, title }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullScreen
      color={'primary.light2'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'primary.main',
          color: 'text.light',
          borderColor: 'transparentLevelsWhite.2',
        },
      }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Sound
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

DialogFullScreen.defaultProps = {
  open: false,
  onClose: () => {},
  children: null,
};

DialogFullScreen.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
};

export default DialogFullScreen;
