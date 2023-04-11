const mongoose = require('mongoose');
const util = require('util');
const nconf = require('nconf');
import redis from 'redis';
import type { RedisClientType, RedisFunctions } from 'redis';


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

interface PromiseRedis extends Omit<RedisClientType, "HGET"> {
  HGET(hashKey: string, key: string): Promise<string | undefined>;
}

// let client
const client = redis.createClient(nconf.get('redisUrl'));
// client.hGet = util.promisify(client.hGet).bind(client);
// client.hset = util.promisify(client.hset).bind(client);
client.HGET = util.promisify(client.HGET);
const exec = mongoose.Query.prototype.exec;

type CacheOptions = { key?: any };

mongoose.Query.prototype.cache = async function (options: CacheOptions = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
}

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  const cacheValue = await client.HGET(this.hashKey, key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc)
  }

  const result = await exec.apply(this, arguments);

  client.HSET(this.hashKey, key, JSON.stringify(result));

  return result;
}

module.exports = {
  clearHash(hashKey: any) {
    client.del(JSON.stringify(hashKey));
  }
};