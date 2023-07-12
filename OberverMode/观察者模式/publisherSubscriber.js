// 发布订阅者模式
// 发布订阅者模式是再观察者模式的基础上延伸出来，
// 观察者模式和发布订阅者模式的同异
// 同：都是对事件间关联的一种实现；都是一对多关系
// 异：
//   - 发布订阅者模式的解耦性更强，订阅者和发布者彼此不知道，由一个事件总线来维护，耦合度低；
//     观察者中，每一个目标对象都会收集相应的观察者，目标对象和观察者都需要遵守约定的成员方法，耦合度高

// 实例： vue2中，eventBus的实现

// 定义事件总线
class EventEmitter {
  constructor() {
    this.events = Object.create(null)
  }
  // 订阅
  $on(type, callback) {
    if(!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(callback)
  }
  // 触发事件更新
  $emit(type, ...args) {
    this.events[type] && this.events[type].forEach(fn => {
      fn(args)
    })
  }
  // 解除订阅
  $off(type, callback) {
    // 基本模式的实现
    if(!type || !callback || !this.events[type]) return
    const index = this.events[type].indexOf(callback)
    if(index > -1) {
      this.events[type].splice(index, 1)
    }
    // eventBus 
    // if(!type) {
    //   // 若未指定订阅事件，这该事件总线清空
    //   this.events = Object.create(null)
    // } else if(!callback) {
    //   // 若未指定回调函数，则该事件置为空
    //   this.events[type] = []
    // } else {
    //   // 指定了事件类型和回调函数，删除该事件下对应的回调函数
    //   if(this.events[type]) {
    //     const index = this.events[type].indexOf(callback) 
    //     if(index > -1) {
    //       this.events[type].splice(index, 1)
    //     }
    //   }
    // }
  }
  // 只订阅一次
  $once(type, callback) {
    // 封装一个新函数，内部处理逻辑为：1.执行原有回调函数，2.取消该新函数的订阅
    // 将新函数作为回调函数添加到事件总线中
    const _this = this
    const fn = function() {
      callback.apply(_this, arguments)
      _this.$off(type, fn)
    }
    this.$on(type, fn)
  }
}

// 运用

// 实例化事件总线
const eventEmitter = new EventEmitter()

// 订阅事件
eventEmitter.$on('click', (arg)=> {
  console.log('click-1',arg)
})
const clickEvent2 = (arg) => {
  console.log('click-2', arg)
}
eventEmitter.$on('click', clickEvent2)
eventEmitter.$on('click', (arg) => {
  console.log('click-3', arg)
})

eventEmitter.$once('touchmove', (arg) => {
  console.log('touchmove-1',arg)
})

// 更新事件1
eventEmitter.$emit('click', 'click1')
eventEmitter.$emit('touchmove', 'touchmove1')

// 取消订阅
eventEmitter.$off('click', clickEvent2)

// 再次更新事件
eventEmitter.$emit('click', 'click2')
eventEmitter.$emit('touchmove', 'touchmove2')
