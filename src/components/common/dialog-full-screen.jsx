import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KButton from './button.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogFullScreen = ({ open, onClose, content, title }) => {
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
          <Typography sx={{ ml: 1, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Typography variant={'subtitle2'} color={'text.dark'}>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <KButton btnLabel={'Read'} />
      </DialogActions>
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
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
};

export default DialogFullScreen;
