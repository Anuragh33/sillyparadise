import styled from 'styled-components';
import GlobalStyles from './styles/Globalstyles';
import Button from './ui/Button';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: green;
`;

const StyledApp = styled.div`
  background-color: lightgreen;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>sillyParadise</H1>
        <Button onClick={() => alert('check in')}>Check In</Button>
        <Button onClick={() => alert('check out')}>Check Out</Button>
      </StyledApp>
    </>
  );
}

export default App;
