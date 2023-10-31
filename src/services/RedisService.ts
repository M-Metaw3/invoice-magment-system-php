// RedisService.ts
import * as redis from 'redis';

// define the service class for interacting with Redis
export class RedisService {
  // define a private property for the redis client instance
  private client: redis.RedisClient;

  // define a private property for storing promises for pending commands
  private pending: Promise<any>[];

  // define a private property for storing errors for failed commands
  private errors: Error[];

  // define a private property for storing results for successful commands
  private results: any[];

  // define the constructor that takes a redis client instance as a parameter
  constructor(client: redis.RedisClient) {
    this.client = client;
    this.pending = [];
    this.errors = [];
    this.results = [];
  }

  // define a method to set data in Redis with a key, a value, and an optional expiration time
  public set(key: string, value: any, expire?: number) {
    // create a promise for the set command
    const promise = new Promise((resolve, reject) => {
      // if there is an expiration time, use the setex command
      if (expire) {
        this.client.setex(key, expire, value, (err, res) => {
          // if there is an error, reject the promise
          if (err) {
            reject(err);
          }
          // otherwise, resolve the promise with the result
          else {
            resolve(res);
          }
        });
      }
      // otherwise, use the set command
      else {
        this.client.set(key, value, (err, res) => {
          // if there is an error, reject the promise
          if (err) {
            reject(err);
          }
          // otherwise, resolve the promise with the result
          else {
            resolve(res);
          }
        });
      }
    });

    // push the promise to the pending array
    this.pending.push(promise);

    // handle the promise resolution or rejection
    promise
      .then((res) => {
        // remove the promise from the pending array
        this.pending.splice(this.pending.indexOf(promise), 1);

        // push the result to the results array
        this.results.push(res);
      })
      .catch((err) => {
        // remove the promise from the pending array
        this.pending.splice(this.pending.indexOf(promise), 1);

        // push the error to the errors array
        this.errors.push(err);
      });
  }

  // define a method to get data from Redis with a key
  public get(key: string) {
    // create a promise for the get command
    const promise = new Promise((resolve, reject) => {
      this.client.get(key, (err, res) => {
        // if there is an error, reject the promise
        if (err) {
          reject(err);
        }
        // otherwise, resolve the promise with the result
        else {
          resolve(res);
        }
      });
    });

    // push the promise to the pending array
    this.pending.push(promise);

    // handle the promise resolution or rejection
    promise
      .then((res) => {
        // remove the promise from the pending array
        this.pending.splice(this.pending.indexOf(promise), 1);

        // push the result to the results array
        this.results.push(res);
      })
      .catch((err) => {
        // remove the promise from the pending array
        this.pending.splice(this.pending.indexOf(promise), 1);

        // push the error to the errors array
        this.errors.push(err);
      });

    // return the promise for chaining or awaiting
    return promise;
  }

  // define a method to check if there are any pending commands
  public hasPending() {
    return this.pending.length > 0;
  }

  // define a method to check if there are any errors
  public hasErrors() {
    return this.errors.length > 0;
  }

  // define a method to get all the errors
  public getErrors() {
    return this.errors;
  }

  // define a method to get all the results
  public getResults() {
    return this.results;
  }

  // define a method to clear all the errors and results
  public clear() {
    this.errors = [];
    this.results = [];
  }
}
