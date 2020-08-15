import React, { Component, Fragment } from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

class App extends Component {
  render() {
    return <Fragment>
      <AppHeader />
      <AppFooter />
    </Fragment>;
  }
}
export default App;
