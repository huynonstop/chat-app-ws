import redis from 'redis';
import { REDIS_URL } from '../config.js';

const redisClient = redis.createClient({
  url: REDIS_URL,
});

export function ping() {
  return new Promise((resolve, reject) => {
    redisClient.ping((err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log('PONG');
        resolve(result);
      }
    });
  });
}

export function addTyping(roomId, userId) {
  return new Promise((resolve, reject) => {
    redisClient.sadd(`room:${roomId}`, userId, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function remTyping(roomId, userId) {
  return new Promise((resolve, reject) => {
    redisClient.srem(`room:${roomId}`, userId, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
export function membersTyping(roomId) {
  return new Promise((resolve) => {
    redisClient.smembers(`room:${roomId}`, (err, result) => {
      if (err) {
        resolve([]);
      } else {
        resolve(result);
      }
    });
  });
}
export function isMemberTyping(roomId, userId) {
  return new Promise((resolve, reject) => {
    redisClient.sismember(`room:${roomId}`, userId, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
export default redisClient;
