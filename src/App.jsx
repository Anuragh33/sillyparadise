import styled from 'styled-components';
import GlobalStyles from './styles/Globalstyles';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Input from './ui/Input';
import Row from './ui/Row';

const StyledApp = styled.div`
  //background-color: lightgreen;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />

      <StyledApp>
        <Row type='vertical'>
          <Row type='horizontal'>
            <Heading as='h1'>The sillyParadise</Heading>

            <div>
              <Heading as='h2'>Check In and Out</Heading>

              <Button
                variation='primary'
                size='medium'
                onClick={() => alert('check in')}
              >
                Check In
              </Button>
              <Button
                variation='secondary'
                size='small'
                onClick={() => alert('check out')}
              >
                Check Out
              </Button>
            </div>
          </Row>

          <Row type='vertical'>
            <Heading as='h3'>Form</Heading>

            <div>
              <Input type='number' placeholder='Number of Guests' />
              <Input type='number' placeholder='Number of Guests' />
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
