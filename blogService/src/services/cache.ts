const mongoose = require('mongoose');
const util = require('util');
const nconf = require('nconf');
const redis = require('redis');


declare module 'mongoose' {
  interface DocumentQuery<
    T,
    DocType extends import('mongoose').Document,
    QueryHelpers = {}
  > {
    mongooseCollection: {
      name: any;
    };
    cache(options: CacheOptions): DocumentQuery<T[], Document> & QueryHelpers;
    useCache: boolean;
    hashKey: string;
  }

  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
    extends DocumentQuery<any, any> { }
}


let client: any
client = redis.createClient({
  host: "127.0.0.1",
  port: "6379"
});

// client.on('connect', () => console.log('Connected to Redis!'));
client.on('error', (err: any) => console.log('Redis Client Error', err));
client.connect();

// client.hGet = util.promisify(client.hGet).bind(client);
// client.hset = util.promisify(client.hset).bind(client);
// client.hGet = util.promisify(client.hGet);
const exec = mongoose.Query.prototype.exec;

type CacheOptions = { key?: any };

mongoose.Query.prototype.cache = async function (options: CacheOptions = {}) {
  try {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
  return this;
  } catch (error) {
    console.log(error);
  }
}

mongoose.Query.prototype.exec = async function () {
  try {
    if (!this.useCache) {
      return exec.apply(this, arguments);
    }

    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
      })
    );
    console.log(key);

    const cacheValue = await client.hGet(this.hashKey, key);

    if (cacheValue) {
      const doc = JSON.parse(cacheValue);
      console.log('cache');
      return Array.isArray(doc)
        ? doc.map(d => new this.model(d))
        : new this.model(doc)
    }
    const result = await exec.apply(this, arguments);

    client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 10);
    client.expire(this.hashKey, 10);
    console.log('db');
    return result;
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  clearHash(hashKey: any) {
    client.del(JSON.stringify(hashKey));
  }
};