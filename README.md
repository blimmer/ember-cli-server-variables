# ember-cli-server-variables

An [Ember CLI](http://www.ember-cli.com/) add-on to support adding variables
to the generated index.html file's `head` tag.

```html
<html>
  <head>
    <meta name='your-app-token' content='example:app:token'>
    <meta name='your-app-user-location' content='Denver'>
  </head>
</html>
```

This is handy when you need to dynamically insert variables from your application
server, such as a session application token to communicate with your API or a user's
location based on their request IP address.  

You can modify the blank `content` tags on your generated index.html file using
a library like [Cheerio](https://github.com/cheeriojs/cheerio). Eventually, with
["configuration-only"](https://github.com/ember-cli/ember-cli-deploy/issues/89)
deployments and ember-cli-deploy, Cheerio will be unnecessary because you can
construct the entire index.html file on your application server.

## Usage
You need to install and configure this add-on for it to work properly.

### Installation
In your CLI project, run
```
ember install:addon ember-cli-server-variables
```

### Configuration
First, you need to modify your index.html file to have a `{{content-for 'server-variables'}}`
block. Here's an example:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Dummy</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{content-for 'head'}}

    <link rel="stylesheet" href="assets/vendor.css">
    <link rel="stylesheet" href="assets/dummy.css">

    {{content-for 'server-variables'}}

    {{content-for 'head-footer'}}
  </head>
  <body>
    {{content-for 'body'}}

    <script src="assets/vendor.js"></script>
    <script src="assets/dummy.js"></script>

    {{content-for 'body-footer'}}
  </body>
</html>
```

Next, modify your `environment.js` file. Convention is to use dasherized names.

Configuration Variables:

  * vars (**required**): An array of your server variables.
  * tagPrefix: a prefix to append to every meta tag to avoid collision. Defaults to ENV.modulePrefix.
  * defaults: a POJO of default values for your server variables.

 an array that describes
the variables you want inserted. If you don't provide defaults,
the fallback is a blank string. Most of the time you'll probably want to only
provide defaults in development mode.

```javascript
module.exports = function(environment) {
  var ENV = {
    serverVariables: {
      tagPrefix: 'your-app',
      vars: ['app-token', 'user-location', 'key']
    }
  }

  ...

  if (environment === 'development') {
    ENV.serverVariables.defaults = {
      'app-token': 'dev-app-token',
      'user-location': 'Denver'
    }
  }
}
```

### Usage
This plugin provides a service to retrieve the server variables in your
Ember app. You can use it like this:

```javascript
MyController = Ember.Controller.extend({
  serverVariablesService = Ember.inject.service('serverVariables'),

  userLocation: Ember.computed.reads('serverVariablesService.userLocation')
});
```

# Development
## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
