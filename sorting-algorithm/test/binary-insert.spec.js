import binaryInsertSort from "../src/binary-insert";

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

describe("binary insert sort", () => {
    let arr, sortedArr;
    beforeEach(()=>{
        arr=randomArray(1000);
        sortedArr=binaryInsertSort([...arr]);
    })
    test("test binary insert sort", () => {
        expect(isAscArray(sortedArr)).toBe(true);
    });
});
