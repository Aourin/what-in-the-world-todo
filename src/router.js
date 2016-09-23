import React from 'react';
import Home  from './Home';

import {
  BrowserRouter,
  Match,
  Miss,
  Link
} from 'react-router';

/**
 * App Router for setting up app routes
 * @returns {JSX}
 * @constructor
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Match exactly pattern='/' component={Home} />
    </BrowserRouter>
  );
};

export default AppRouter;
