import { useNavigate } from 'react-router-dom';

const useProjectsLogic = () => {
  const navigate = useNavigate();

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return {
    handleProjectClick,
  };
};

export default useProjectsLogic;
