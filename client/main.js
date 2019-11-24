import { Meteor }  from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker'; 
import { routes, onAuthChange} from '../imports/routes/routes';
import { Links } from '../imports/api/links';
import { Session } from 'meteor/session';

import '../imports/startup/simple-schema-config';
  
Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
})

Tracker.autorun(() => {
  const name = Session.get('name');
  console.log(name);
})


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
})
