// 观察者模式

// 定义目标对象
class Subscriber {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    const index = this.subs.indexOf(sub)
    if(index > -1) {
      this.subs.splice(index, 1)
    }
  }
  notify() {
    const args = Array.from(arguments)
    this.subs.forEach(sub => {
      sub.update(args)
    })
  }
}

// 定义观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(data) {
    console.log(`${this.name} update with data- ${data}`)
  }
}


// 运用
// 定义目标
const target = new Subscriber()
// 定义观察者
const obser1 = new Observer('zhangsan')
const obser2 = new Observer('lisi')
const obser3 = new Observer('wanger')

// 事件监听
target.addSub(obser1)
target.addSub(obser2)
target.addSub(obser3)

// 移除某事件
target.removeSub(obser2)

// 事件更新
target.notify('this is notify')