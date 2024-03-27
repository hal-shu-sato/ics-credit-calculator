import { Container } from 'react-bootstrap';

import Calculator from './calculator';

export default function Home() {
  return (
    <Container as="main">
      <div>
        <h1>ICS Credit Calculator</h1>
      </div>
      <Calculator />
    </Container>
  );
}
