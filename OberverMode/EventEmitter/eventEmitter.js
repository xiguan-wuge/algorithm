// 手写发布-订阅者模式
// 思考： 
  // 1. 什么是发布订阅者模式
  //     答： 发布订阅者模式是对象间的一种一对多的依赖关系，
  //         当一个对象的状态发生改变时，所有依赖于它的对象都将收到状态改变的通知

  // 2. 怎么实现一对多
  //     答： 用一个事件调度中心来调度事件，
  //         订阅者可以注册事件(on)到事件中心，
  //         发布者可以发布事件(emit)到事件中心，
  //         订阅者可以取消订阅(off)或者只订阅一次(once)

  // 实现的例子：vue中的eventBus的实现

class EventEmitter {
  constructor() {
    this.events = {}
  }

  // 订阅
  on(type, callback) {
    if(!this.events) {
      this.event = Object.create(null)
    }
    if(!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  // 删除订阅
  off(type, callback) {
    if(!this.events[type]) return;
    this.events[type] = this.events[type].filter(item => {
      return item !== callback
    })
  }

  // 只执行一次订阅事件
  once(type, callback) {
    // 在订阅事件时的回调中做处理（添加删除订阅的操作）
    function fn() {
      this.off(type, callback)
      callback()
    }
    this.on(type, fn)
  }

  // 触发事件
  emit(type, ...args) {
    // 执行对应数组中的所有回调函数
    this.events[type] && this.events[type].forEach(fn => {
      fn.apply(this, args)
    })
  }
}

// 使用如下
const emitter = new EventEmitter()

const handle = (...args) => {
  console.log('handle', args)
}

emitter.on('click', handle)
emitter.emit('click', 1,2,3,4)
emitter.off('click', handle)

emitter.emit('click', 1,2)
emitter.on('cbClick', (...args)=> {
  console.log('dbClick-handle', args)
})
console.log('emitter', emitter)

// emitter.once('cbClick', ()=> {
//   console.log('once-cbClick')
// })
emitter.emit('dbClick')
emitter.emit('dbClick')