// 观察者模式
// 一种一对多的关系
// 和发布订阅者模式的区别：
//   1. 发布订阅者模式有 事件订阅中心 来维护，订阅者和发布者彼此不知道，耦合度低；
//     观察者模式，每一个目标对象都会收集相应的观察者，目标对象和观察者都需要遵守约定的成员方法，耦合度高

// 例子：vue 数据双向绑定原理中，数据变化->相应更新的实现（依赖追踪）

// 定义目标对象(用户)
class Subscrber {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    let index = this.subs.indexOf(sub)
    if(index > -1) {
      this.subs.splice(index,1)
    }
  }
  notify() {
    const subs =  this.subs.slice()
    subs.forEach(sub => {
      sub.update()
    })
  }
}

// 定义观察者对象
class Observer {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log(`${this.name} changed`)
  }
}

// 运用
let subscribe = new Subscrbe()
let ob1 = new Observer('zhangsan')
let ob2 = new Observer('lisi')

subscribe.addSub(ob1)
subscribe.addSub(ob2)
subscribe.removeSub(ob1)

subscribe.notify()

// 参考链接：https://www.jianshu.com/p/2571d170191