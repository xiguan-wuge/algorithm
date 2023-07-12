// LUR(最近最少使用)缓存机制
// 题目链接
// 满足性质：

// - 最多存储n对KV;
// - 如果大于n个, 则随意剔除一个已经过期的KV;
// - 如果没有过期的KV, 则按照LRU的规则剔除一个KV;
// - 查询时如果已经过期, 则返回空;

/**
 * capacity： 容量
 * intervalTime： 过期时间
 */
class LRUCache {
  constructor(capacity, intervalTime) {
    this.cache = new Map()
    this.capacity = capacity
    this.intervalTime = intervalTime
  }
  get(key) {
    if(!this.cache.has(key)) {
      return -1
    }
    const tempValue = this.cache.get(key)
    // console.log('tempValue', tempValue)
    // 虽然值是一样的，但是通过删除旧的，添加新的，促使在Map实例遍历时，最新的，总是排在最后
    this.cache.delete(key)
    if(Date.now() - tempValue.time >  this.intervalTime) {
      return -1
    }
    this.cache.set(key, {value: tempValue.value, time: Date.now()})
    return tempValue.value
  }
  put(key, value) {
    // 虽然值是一样的，但是通过删除旧的，添加新的，促使在Map实例遍历时，最新的，总是排在最后
    if(this.cache.has(key)) {
      this.cache.delete(key)
    }
    if(this.cache.size >= this.capacity) { // 达到最大可缓存数量
      // keys是map数据中，先后插入顺序生成的key列表
      const keys = this.cache.keys()
      // 删除Map列表中，最前那一项（访问时间最就，time值最小）
      this.cache.delete(keys.next().value)
    }
    this.cache.set(key, {value, time: Date.now()})
  }
}

let cache = new LRUCache(2, 1000)
cache.put(1, 1)
console.log('cache-1', cache);
cache.put(2, 2)
console.log('cache-2', cache);
console.log('get(1)', cache.get(1));
cache.put(3,3)
console.log('put3', cache)
console.log('cache.get(2)', cache.get(2));
cache.put(4,4)
console.log('put4', cache)
console.log('get(1)', cache.get(1));
console.log('get(3)', cache.get(3));
console.log('get(4)', cache.get(4));

setTimeout(() => {
  console.log('get(4)', cache.get(4));
}, 2000)



