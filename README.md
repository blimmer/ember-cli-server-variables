# ember-cli-server-variables [![Build Status](https://travis-ci.org/blimmer/ember-cli-server-variables.svg?branch=master)](https://travis-ci.org/blimmer/ember-cli-server-variables) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-server-variables.svg)](http://emberobserver.com/addons/ember-cli-server-variables) [![Code Climate](https://codeclimate.com/github/blimmer/ember-cli-server-variables/badges/gpa.svg)](https://codeclimate.com/github/blimmer/ember-cli-server-variables)

An [Ember CLI](http://www.ember-cli.com/) add-on to support adding variables
to the generated index.html file's `head` tag.

```html
<html>
  <head>
    <meta name='your-app-token' content='example:app:token'>
    <meta name='your-app-user-location' content='Denver'>
    <meta name='your-app-json-data' content='{"foo":"bar"}'>
  </head>
</html>
```

This is handy when you need to dynamically insert variables from your application
server, such as a session application token to communicate with your API or a user's
location based on their request IP address.

You can modify the blank `content` tags on your generated index.html file using
a library like [Cheerio](https://github.com/cheeriojs/cheerio).

## Compatibility

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Usage
You need to install and configure this add-on for it to work properly.

### Installation
In your CLI project, run
```
ember install ember-cli-server-variables
```

### Configuration
Add a `serverVariables` block your `environment.js` file.

Configuration Variables:

  * vars (**required**): An array of your server variables. Convention is to use dasherized names.
  * tagPrefix: a prefix to append to every meta tag to avoid collision. Defaults to `ENV.modulePrefix`.
  * defaults: a POJO of default values for your server variables. **Note:** If
  you don't provide defaults, the fallback is a blank string. Most of the time
  you'll probably want to only provide defaults in development mode.

```javascript
module.exports = function(environment) {
  var ENV = {
    serverVariables: {
      tagPrefix: 'your-app',
      vars: ['app-token', 'user-location', 'key']
    }
  };

  ...

  if (environment === 'development') {
    ENV.serverVariables.defaults = {
      'app-token': 'dev-app-token',
      'user-location': 'Denver'
    };
  }
};
```

### Usage
This plugin provides a service to retrieve the server variables in your
Ember app. You can use it like this:

```javascript
export default Ember.Component.extend({
  serverVariablesService: Ember.inject.service('serverVariables'),

  userLocation: Ember.computed.reads('serverVariablesService.userLocation')
});
```

## Troubleshooting
Some tips & tricks if something isn't working correctly.

### Check that the `{{content-for 'server-variables'}}` tag is present in your `app/index.html` file

This is how we insert the meta tags into your app. We try to do this automatically
when you `ember install` this addon, but there are potentially times where this
operation could fail. Your `app/index.html` file should look something like this:

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

    <!-- THIS IS THE IMPORTANT BIT! -->
    {{content-for 'server-variables'}}
    <!-------------------------------->

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

### Ensure you've defined a `vars` array in your `config/environment.js` file
Make sure that you followed the [configuration instructions](#configuration)
to get your vars defined.

# Development
## Installation

* `git clone` this repository
* `npm install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

See the [Contributing](CONTRIBUTING.md) guide for details.
For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
