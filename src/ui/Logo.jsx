import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const src = isDarkMode ? '/darkLogo.png' : '/lightLogo.png';

  const alt = isDarkMode ? 'darkLogo' : 'lightLogo';

  return (
    <StyledLogo>
      <Img src={src} alt={alt} />
    </StyledLogo>
  );
}

export default Logo;
