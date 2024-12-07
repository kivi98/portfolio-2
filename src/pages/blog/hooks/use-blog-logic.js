import { useState } from 'react';

const useBlogLogic = () => {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const handleFullScreen = () => {
    console.log('handleFullScreen');
    setFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setFullScreen(false);
  };

  const handleOpen = () => {
    console.log('handleOpen');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose,
    fullScreen,
    handleFullScreen,
    handleCloseFullScreen,
  };
};

export default useBlogLogic;
