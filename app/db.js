var pg = require('pg');
var _ = require('underscore');

module.exports = function() {
    function DbProxy () {
        this.pools = {
            read: null,
            write: null,
        };
        this.config = {};
    };

    DbProxy.prototype.setup = function(config) {
        config.shared = config.shared || {};
        this.config = config;

        if (this.pools.read) {
            console.log("Closing 'read' pool");
            this.pools.read.end();
        }

        if (this.pools.write) {
            console.log("Closing 'write' pool");
            this.pools.write.end();
        }

        // Setup pools
        this.pools.read = new pg.Pool(_.extend(config.shared, config.read));
        this.pools.write = new pg.Pool(_.extend(config.shared, config.write));
    };

    DbProxy.prototype.read = function() {
        if (this.pools.read === null) {
            return Promise.reject();
        } else {
            return Promise.resolve(this.pools.read);
        }
    }

    DbProxy.prototype.write = function() {
        if (this.pools.write === null) {
            return Promise.reject();
        } else {
            return Promise.resolve(this.pools.write);
        }
    }

    return new DbProxy();
};