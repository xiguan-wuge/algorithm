// 输入两个增序数组，合并成一个增序数组
var mergeTwoLists = function(l1, l2) {
    var l1Index = 0
    var l2Index = 0
    var result = []
    while(l1Index < l1.length && l2Index < l2.length) {
        console.log('l1Index',l1Index);
        console.log('l2Index',l2Index);
        if(l1[l1Index] < l2[l2Index]) {
            result.push(l1[l1Index])
            l1Index = l1Index + 1
        } else if(l1[l1Index] > l2[l2Index]) {
            result.push(l2[l2Index])
            l2Index =l2Index + 1
        } else if(l1[l1Index] === l2[l2Index]) {
            result.push(l1[l1Index], l2[l2Index])
            l1Index =l1Index + 1
            l2Index += l2Index + 1
        }
    }
    return result
};
var l1Arr = [1, 2, 4]
var l2Arr = [1, 3, 4]

var answer = mergeTwoLists(l1Arr, l2Arr)
console.log('answer',answer);
