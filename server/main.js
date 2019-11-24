import { Meteor } from 'meteor/meteor';
import { validateUser } from '../imports/api/users';
import { Links } from '../imports/api/links';
import { WebApp } from 'meteor/webapp';

import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
  validateUser();

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id: _id});
    console.log(_id);

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url)
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }

  });

  WebApp.connectHandlers.use((req, res, next) => {
    console.log(req.url, req.method, req.query);
    next();
})
});