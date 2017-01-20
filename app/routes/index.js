var express = require('express');
var _ = require('underscore');

module.exports = function(docker, db) {

  var router = express.Router();
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index');
  });

  router.get('/running', function(req, res, next) {
    docker.listContainers({all: true}, function(err, containers) {
      if (err) {
        console.log(err);
        return;
      }

      res.render('containers', {
        containers: _.filter(containers, function(container) {
          return 'demo.role' in container.Labels;
        })
      });
    });
  });

  router.post('/data', function(req, res, next) {
    db.write()
      .then(function(conn) {
        return conn.query("INSERT INTO demo VALUES ($1)", [req.body['value']]);
      })
      .then(function(rs) {
        res.status(200).send();
      })
      .catch(function(err){
        console.log(err);
        res.status(500).send();
      });
  });

  router.get('/data', function(req, res, next) {
    db.read()
      .then(function(conn) {
        return conn.query("SELECT * FROM demo");
      })
      .then(function(rs) {
        res.render('data', { data: rs.rows });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send();
      });
  });

  router.post('/config', function(req, res, next) {
    console.log(req.body);
    db.setup({
      shared: db.config.shared,
      read: {
        host: req.body.slave
      },
      write: {
        host: req.body.master
      }
    });
    res.status(200).send();
  });

  return router;
}
