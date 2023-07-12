// 数组扁平化

function flatten(arr, result) {
    console.log('arr', arr);
    console.log('result', result);
    result = result || []
    if (Array.isArray(arr)) {
        arr.forEach(item => {
            if (Array.isArray(item)) {
                flatten(item, result)
            } else {
                result.push(item)
            }
        })
    }
    return result
}

// let arr = [
//     1,
//     [
//         2,
//         [3, 4],
//         [5, 6, [7, 8]]
//     ]
// ]
// var arrResult = flatten(arr)
// console.log('arrResult', arrResult);

// 对象扁平化
// function flattenObj(source, key="", res = {}, isArray = false) {
//     for(let [k, v] in Object.entries(source)) {
//         if(Array.isArray(v)) {
//             let temp = isArray ? `${key}[${k}]` : `${key}${k}`
//             flatten(v, temp, res, true)
//         } else if(typeof v === 'object'){
//             let temp = isArray ? 
//         }
//     }
// }

// function flattenObj(obj, key = "", res = {}, isArray = false) {
//     for (let [k, v] of Object.entries(obj)) {
//         if (Array.isArray(v)) {
//             let tmp = isArray ? key + "[" + k + "]" : key + k
//             flattenObj(v, tmp, res, true)
//         } else if (typeof v === "object" && v !== null) {
//             let tmp = isArray ? key + "[" + k + "]." : key + k + "."
//             flattenObj(v, tmp, res)
//         } else {
//             let tmp = isArray ? key + "[" + k + "]" : key + k
//             res[tmp] = v
//         }
//     }
//     return res
// }
function flattenObj(obj, key='', res={}, isArray=false) {
    // isArray 表示父级数据是数组还是对象，便于区分key值的建立
    for(const [k, v] of Object.entries(obj)) {
        // 对当前遍历项的数据类型做判断
        if(Array.isArray(v)) {
            const tempKey = isArray ? `${key}[${k}]` : `${key}${k}`
            flattenObj(v, tempKey, res, true)
        } else if(typeof v === 'object' && v !== null) {
            const tempKey = isArray ? `${key}[${k}].` : `${key}${k}.`
            flattenObj(v, tempKey, res, false)
        } else {
            // 基本数据类型
            const tempKey = isArray ? `${key}[${k}]` : `${key}${k}`
            res[tempKey] = v
        }
    }
    return res
}
var entryObj = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
};
var o = {
    a: 1,
    b: [
        1,
        2,
        {
            c: true
        }
    ],
    d: {
        e: 2,
        f: 3
    },
    g: null
};
var result = flattenObj(o);
console.log('res', JSON.stringify(result));
