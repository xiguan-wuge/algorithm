// 题目给定一个数组，转成一个数组嵌套对象
let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]
let answer = [
  {
    "id": 1,
    "name": "部门1",
    "pid": 0,
    "children": [
      {
        "id": 2,
        "name": "部门2",
        "pid": 1,
        "children": []
      },
      {
        "id": 3,
        "name": "部门3",
        "pid": 1,
        "children": [
          // 结果 ,,,
        ]
      }
    ]
  }
]

function arrayToTree(list, rootId = 0, sortFildId = 'pid', uniqueId = 'id') {
  const map = new Map()
  // 排序，升序，便于后面的tree的生成（注意是按父节点的id来排序）
  const sortArr = list.map(item => item).sort((a, b) => {
    return a[sortFildId] - b[sortFildId]
  })
  sortArr.forEach(item => {
    // 使用map对象，保存数据，便于查找
    if (!map.has(item[uniqueId])) {
      item.children = []
      map.set(item[uniqueId], item)
    }
    // 构建有序的map对象
    if (map.has(item[sortFildId])) {
      const parent = map.get(item[sortFildId])
      parent.children.push(item)
      map.set(item[sortFildId], parent)
    }
  })
  return map.get(rootId)
}
function arrayToTree(list, rootId = 0, sortFieldId = 'pid', uniqueId = 'id') {
  const map = new Map()
  const sortedArr = list.map(item => item).sort((a, b) => {
    return a[sortFieldId] - b[sortFieldId]
  })
  // 生成tree
  sortedArr.forEach(item => {
    if(!map.has(item.uniqueId)) {
      item.children = []
      map.set(item[uniqueId], item)
    }
    // 构建有序的map对象
    if(map.has(item[sortFieldId])) {
      const parent = map.get(item[sorteFieldId])
      parent.children.push(item)
      map.set(item[sortFieldId], parent)
    }
  })
  return map.get(rootId)
}

/**
 * 将数组转换为树形对象
 * 步骤：
 * 1. 现将数组按父级id有小到大排序，生成新数组sortedArr
 * 2. 遍历sortedArr,将每一项添加到map对象中（便于快速查找），
 *    同时，为父级组织添加子组织
 * 3. 最终返回指定组织ID对应的组织结构
 * @param {Array} list 
 * @param {String | Number} targetOrgId 
 * @param {String} sortFildId 
 * @param {String} uniqueId 
 */
function arrayToTree(list, targetOrgId = 0, sortFieldId = 'pid', uniqueId='id') {
  // 生成map对象用于缓存组织和生成新树形组织
  const map = new Map()
  // 排序（默认认为 组织id比较小的，组织比较靠前）
  const sortedArr = list.map(item => item).sort((a, b) => {
    return a[sortFieldId] - b .sortFieldId
  })

  // 遍历，生成新的组织
  sortedArr.forEach(item => {
    // 往map中添加组织自身
    if(!map.has(item[uniqueId])) {
      item.children = []
      map.set(item[uniqueId], item)
    }
    // 当前组织存在父级组织，则再父级组织中添加自身
    if(map.has(item[sortFieldId])) {
      const parent = map.get(item[sortFieldId])
      parent.children.push(item)
      // 重新赋值父级组织
      map.set(item[sortFieldId], parent)
    }
  })

  // 返回指定的组织
  return map.get(targetOrgId)
}
const result = arrayToTree(arr, 1, 'pid', 'id')
console.log('result', result)
// {"id":1,"name":"部门1","pid":0,"children":[{"id":2,"name":"部门2","pid":1,"children":[]},{"id":3,"name":"部门3","pid":1,"children":[{"id":4,"name":"部门4","pid":3,"children":[{"id":5,"name":"部门5","pid":4,"children":[]}]}]}]}
// console.log(JSON.stringify(arrayToTree(arr, 1, 'pid', 'id')))
