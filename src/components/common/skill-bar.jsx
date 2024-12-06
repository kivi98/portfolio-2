import { Box } from '@mui/material';
import * as PropTypes from 'prop-types';

const SkillBar = ({ skill, level }) => {
  return (
    <Box>
      <div>
        {skill}: {level}
      </div>
    </Box>
  );
};

SkillBar.defaultProps = {
  level: 0,
  skill: '',
};

SkillBar.propTypes = {
  level: PropTypes.number,
  skill: PropTypes.string,
};

export default SkillBar;
