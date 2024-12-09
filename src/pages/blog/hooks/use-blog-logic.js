import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useBlogLogic = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleBlogClick,
  };
};

export default useBlogLogic;
