import React from 'react';
import { Link } from '@reach/router';

import Container from '../components/Container';

const AboutUs = () => (
  <Container flex className="page flex-column">
    <div>
      <span>Icons made by </span>
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik
      </a>
      <span> from </span>
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </div>
    <div>
      <Link to="/">Back to home</Link>
    </div>
  </Container>
);

export default AboutUs;
