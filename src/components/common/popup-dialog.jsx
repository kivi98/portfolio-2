import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import KButton from './button.jsx';
import KDivider from './divider-vertical.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopupDialog = ({ open, onClose, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      scroll={'paper'}
      color={'primary.light2'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'primary.main',
          color: 'text.light',
          borderRadius: 2,
          border: 'solid 1px',
          borderColor: 'transparentLevelsWhite.2',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <KDivider orientation={'horizontal'} width={'95%'} />
      <DialogContent>
        <Typography variant={'subtitle2'} color={'text.dark'}>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <KButton btnLabel={'Close'} variant={'outlined'} onClick={onClose} />
        <KButton btnLabel={'Read'} />
      </DialogActions>
    </Dialog>
  );
};

PopupDialog.defaultProps = {
  open: false,
  onClose: () => {},
  children: null,
};

PopupDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
};

export default PopupDialog;
