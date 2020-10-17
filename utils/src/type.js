let class2type = "Boolean Number String Function Array Date RegExp Object Error".split(" ").reduce((acc, cur) => {
    acc[`[object ${cur}]`] = cur.toLocaleLowerCase();
    return acc;
}, {});

export default function (obj) {
    // if (obj === null) return obj + "";
    if (obj == null) return String(obj);
    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object"
        ? class2type[{}.toString.call(obj)] || "object" // class2type[Object.prototype.toString.call(obj)] || "object"
        : typeof obj;
}
