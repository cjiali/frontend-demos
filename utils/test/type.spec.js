import type from "../src/type";

describe("type", () => {
    test("test type", () => {
        expect(type(true)).toBe("boolean"); // "[object Boolean]"
        expect(type(1)).toBe("number"); // "[object Number]"
        expect(type("1")).toBe("string"); // "[object String]"
        expect(type(Symbol())).toBe("symbol"); // "[object Symbol]"
        expect(type(undefined)).toBe("undefined"); // "[object Undefined]"
        // expect(type(a)).toBe(); // a 没有声明，但是还会显示 undefined

        expect(type(null)).toBe("null"); // "[object Null]"
        expect(type({})).toBe("object"); // "[object Object]"
        expect(type([])).toBe("array"); // "[object Array]"
        expect(type(function () {})).toBe("function"); // "[object Function]"
    });
});
