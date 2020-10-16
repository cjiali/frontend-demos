import debounce from "../src/debounce";

// tell jest to mock all timeout functions
jest.useFakeTimers();

describe("debounce", () => {
    let fn, debouncedFn;

    test("test debounce without param `immediate`", () => {
        fn = jest.fn();
        debouncedFn = debounce(fn, 1000);
        for (let i = 0; i < 100; i++) {
            debouncedFn();
        }
        // 在这个时间点，回调函数不应该被执行
        expect(fn).not.toBeCalled();

        // “快进”时间使得所有定时器回调被执行
        jest.runAllTimers();
        // 在这个时间点，回调函数应该只有最后一次声明被执行
        expect(fn).toBeCalledTimes(1);

        debouncedFn();
    });

    test("test debounce with param `immediate`", () => {
        fn = jest.fn();
        debouncedFn = debounce(fn, 1000, true);

        for (let i = 0; i < 100; i++) {
            debouncedFn();
        }
        // 在这个时间点，回调函数应该被立即执行
        expect(fn).toBeCalledTimes(1);

        // “快进”时间使得所有定时器回调被执行
        jest.runAllTimers();
        // 在这个时间点，回调函数应该只有第一次声明被执行
        expect(fn).toBeCalledTimes(1);

        debouncedFn();
        // 在这个时间点，回调函数应该再一次被执行
        expect(fn).toBeCalledTimes(2);
    });
});
