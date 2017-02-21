import React from 'react';
import { IntlProvider } from 'react-intl';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  ApplicationRootPage,
  HomePage,
  PlanningRootPageContainer,
  PresentationRootPageContainer,
  ReportingRootPageContainer
} from '/imports/ui/pages';

/*
 Overrides for our custom styles
 */
const muiTheme = getMuiTheme({
  fontFamily: 'sans-serif',
  palette: {
    primary1Color: "#d4622a"
  }
});

/**
 * @fileOverview
 */
Meteor.startup(function () {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <IntlProvider locale="en-AU" >
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
          <Route path="/" component={ApplicationRootPage} >
            <IndexRoute component={HomePage} />
            <Route path="/planning" component={PlanningRootPageContainer} />
            <Route path="/presentation" component={PresentationRootPageContainer} />
            <Route path="/reporting" component={ReportingRootPageContainer} />
          </Route>
        </Router>
      </IntlProvider>
    </MuiThemeProvider>, document.getElementById("react-root"));
});