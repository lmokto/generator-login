'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling' + chalk.red('Login') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Instalar app-login con autenticacion passport-local?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {

    app: function () {
      
      this.copy('server.js', 'server.js');

      this.mkdir('lib');
      this.copy('passport.js', 'lib/passport.js');

      this.mkdir('controllers');
      this.copy('auth.js', 'controllers/auth.js');

      this.mkdir('models');
      this.copy('generar-usuario.js', 'models/generar-usuario.js');
      this.copy('user.js', 'models/user.js');

      this.mkdir('public');
      this.copy('favicon.ico', 'public/favicon.ico');

      this.mkdir('public/img');
      this.copy('background.jpg', 'public/img/background.jpg');

      this.mkdir('routes');
      this.copy('index.ejs', 'routes/index.ejs');
      this.copy('login.ejs', 'routes/login.ejs');

    },
    
    git: function () {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },
    
    bower: function(){
      this.template('bowerrc', '.bowerrc');
      this.copy('_bower.json', 'bower.json');
    },

    packageJSON: function(){
      this.template('_package.json', 'package.json');
    },

    jshint: function () {
      this.copy('jshintrc', '.jshintrc');
    },

    editorConfig: function () {
      this.copy('editorconfig', '.editorconfig');
    },
    
    projectfiles: function () {
      this.copy('Gruntfile.js', 'gruntfile.js');
      this.copy('config.json', 'config.json');
      this.copy('Procfile', 'Procfile');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
