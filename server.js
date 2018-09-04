const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs')

app.get('/', function(request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Mini Facebook');
    data = data.replace(/\$OG_DESCRIPTION/g, "An app where anyone can sign up and post articles. There is a comment and reply functionality too, just like Facebook.");
    result = data.replace(/\$OG_IMAGE/g, 'https://image.ibb.co/fKbPXp/mini_facebook.png');
    response.send(result);
  });
});

app.get('/articleShow', function(request, response) {
  console.log('Article page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Article');
    data = data.replace(/\$OG_DESCRIPTION/g, "Article page description");
    result = data.replace(/\$OG_IMAGE/g, 'https://image.ibb.co/fKbPXp/mini_facebook.png');
    response.send(result);
  });
});

app.get('/signin', function(request, response) {
  console.log('signin page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Sign In');
    data = data.replace(/\$OG_DESCRIPTION/g, "Sign In");
    result = data.replace(/\$OG_IMAGE/g, 'https://image.ibb.co/fKbPXp/mini_facebook.png');
    response.send(result);
  });
});

app.get('/signup', function(request, response) {
  console.log('signup page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Sign Up');
    data = data.replace(/\$OG_DESCRIPTION/g, "Create account");
    result = data.replace(/\$OG_IMAGE/g, 'https://image.ibb.co/fKbPXp/mini_facebook.png');
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
