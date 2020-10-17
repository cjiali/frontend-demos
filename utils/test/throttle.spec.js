import throttle from "../src/throttle";

// tell jest to mock all timeout functions
jest.useFakeTimers();

describe("throttle", () => {
    let fn, throttledFn;

    beforeEach(() => {
        fn = jest.fn();
    });

    test("test throttle", () => {
        throttledFn = throttle(fn, 500);
        for (let i = 0; i < 100; i++) {
            throttledFn();
        }
        // 在这个时间点，回调函数不应该被执行
        expect(fn).not.toBeCalled();

        // “快进”时间使得所有定时器回调被执行
        jest.runAllTimers();
        // 在这个时间点，回调函数应该只有最后一次声明被执行
        expect(fn).toBeCalledTimes(1);

        throttledFn();
    });
});
