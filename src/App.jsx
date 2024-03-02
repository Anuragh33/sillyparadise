import styled from 'styled-components';
import GlobalStyles from './styles/Globalstyles';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Input from './ui/Input';
import Row from './ui/Row';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: green;
`;

const StyledApp = styled.div`
  //background-color: lightgreen;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Heading as='h1'>sillyParadise</Heading>

          <div>
            <Heading as='h2'>Check In and Out</Heading>

            <Button onClick={() => alert('check in')}>Check In</Button>
            <Button onClick={() => alert('check out')}>Check Out</Button>
          </div>
        </Row>

        <Row>
          <Heading as='h3'>sillyParadise</Heading>

          <div>
            <Input type='number' placeholder='Number of Guests' />
            <Input type='number' placeholder='Number of Guests' />
          </div>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
