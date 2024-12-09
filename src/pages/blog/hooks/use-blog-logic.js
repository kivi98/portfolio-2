import { useNavigate } from 'react-router-dom';

const useBlogLogic = () => {
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  return {
    handleBlogClick,
  };
};

export default useBlogLogic;
