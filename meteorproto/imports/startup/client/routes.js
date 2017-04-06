import React from 'react';
import { IntlProvider } from 'react-intl';
import { Router, Route, IndexRoute, Redirect, browserHistory }
  from 'react-router';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ApplicationRootPage }
  from '/imports/ui/pages/ApplicationRootPage.jsx';
import { HomePage }
  from '/imports/ui/pages/HomePage.jsx';

// Planning pages
import { PlanningRootPageContainer }
  from '/imports/ui/pages/planning/PlanningRootPageContainer.jsx';
import { CalendarPlanningTermPageContainer }
  from '/imports/ui/pages/planning/calendar/CalendarPlanningTermPage.jsx';
import { CalendarPlanningDayPage }
  from '/imports/ui/pages/planning/calendar/CalendarPlanningDayPage.jsx';
import { LessonPlanningPageContainer }
  from '/imports/ui/pages/planning/lesson/LessonPlanningPageContainer';
import { AssessmentCreatorContainer }
  from '/imports/tools/assessment-creator/ui/AssessmentCreator';
import LessonPlanOverview
  from '/imports/ui/components/LessonPlanOverview.jsx';

// Presentation pages
import { PresentationRootPageContainer }
  from '/imports/ui/pages/presentation/PresentationRootPageContainer.jsx';

// Reporting pages
import { ReportingRootPageContainer }
  from '/imports/ui/pages/reporting/ReportingRootPageContainer.jsx';

import { ToolsRootPageContainer }
  from '/imports/ui/pages/tools/ToolsRootPageContainer.jsx';
import { AssessmentCreatorPage }
  from '/imports/ui/pages/tools/AssessmentCreatorPage.jsx';

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
            <Route path="planning" component={PlanningRootPageContainer}>
              <IndexRoute component={CalendarPlanningTermPageContainer} />
              <Route path="date/:date"
                     component={CalendarPlanningDayPage} />
              <Route path="lessons/:lessonId"
                     component={LessonPlanningPageContainer} >
                <Route path="assessment-creator/:assessmentId"
                       component={AssessmentCreatorContainer}>
                </Route>
                <IndexRoute component={LessonPlanOverview} />
              </Route>
            </Route>
            <Route path="presentation"
                   component={PresentationRootPageContainer} />
            <Route path="reporting"
                   component={ReportingRootPageContainer} />
            <Route path="tools"
                   component={ToolsRootPageContainer}>
              <Route path="assessment-creator"
                     component={AssessmentCreatorPage} />
              <Route path="assessment-creator/:assessmentId"
                     component={AssessmentCreatorPage} />
            </Route>
          </Route>
        </Router>
      </IntlProvider>
    </MuiThemeProvider>, document.getElementById("react-root"));
});