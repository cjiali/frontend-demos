import {quickSort1,quickSort2} from "../src/quick";

function randomArray(length) {
    let arr = Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = Math.random();
    }
    return arr;
}

function isAscArray(array) {
    return array.every((v, i, a) => {
        return i == 0 ? true : v >= a[i - 1];
    });
}

function isDscArray(array) {
    return array.every((v, i, a) => {
        return i == 0 ? true : v <= a[i - 1];
    });
}

describe("quick sort", () => {
    let arr, sortedArr;
    beforeEach(()=>{
        arr=randomArray(100000);
        console.time('quickSort1')
        sortedArr=quickSort1([...arr]);
        console.timeEnd('quickSort1')
        console.time('quickSort2')
        sortedArr=quickSort2([...arr]);
        console.timeEnd('quickSort2')
    })
    test("test quick sort", () => {
        expect(isAscArray(sortedArr)).toBe(true);
    });
});
