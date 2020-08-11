import * as Util from ".";

const match = (s: string) => Util.firstMatch(s, Util.REGEX_FILENAME);

describe("Util (Regex function)", () => {
    test("REGEX_FILENAME", () => {
        expect(match("d:/web/js-lib/src/main.ts")).toBe("main.ts");
        expect(match("d:/web/js-lib/src/main.js")).toBe("main.js");
        expect(match("./main.ts")).toBe("main.ts");
        expect(match("./main.json")).toBe("main.json");
        expect(match("./main.spec.js")).toBe("main.spec.js");
        expect(match("./main-js")).toBeUndefined();
    });
    test("REGEX_COMMAND_LINE", () => {
        expect("rank Gold 1".match(Util.REGEX_COMMAND_LINE)).toEqual(["rank", "Gold", "1"]);
        expect("rank \"Gold 1\"".match(Util.REGEX_COMMAND_LINE)).toEqual(["rank", "\"Gold 1\""]);
    });
    test("REGEX_QUOTES", () => {
        expect("\"Gold 1\"".replace(Util.REGEX_QUOTES, "&quot;")).toBe("&quot;Gold 1&quot;");
        expect("'Gold 1'".replace(Util.REGEX_QUOTES, "&quot;")).toBe("&quot;Gold 1&quot;");
        expect("' 'Gold 1' '".replace(Util.REGEX_QUOTES, "&quot;")).toBe("&quot; 'Gold 1' &quot;");
    });
    test("REGEX_COMMAND_LINE", () => {
        expect("rank Gold 1".match(Util.REGEX_COMMAND_LINE)).toEqual(["rank", "Gold", "1"]);
        expect("rank \"Gold 1\"".match(Util.REGEX_COMMAND_LINE)).toEqual(["rank", "\"Gold 1\""]);
    });
    test("REGEX_BASE64", () => {
        expect(Util.REGEX_BASE64.test("data:text/plain;base64,aGk=")).toBeTruthy();
    });
});

describe("Util (Pure function)", () => {
    test("commandArgs", () => {
        expect(Util.commandArgs("!kick raziEiL")).toEqual(["!kick", "raziEiL"]);
        expect(Util.commandArgs("!kick raziEiL \"coding too much!\"")).toEqual(["!kick", "raziEiL", "coding too much!"]);
        expect(Util.commandArgs("!kick raziEiL 'coding too much!'")).toEqual(["!kick", "raziEiL", "coding too much!"]);
    });
    test("firstMatch", () => {
        expect(Util.firstMatch("1 2 3 4 5", /\d/g)).toBe("1");
        expect(Util.firstMatch("hi 1 2", /\d/g)).toBe("1");
        expect(Util.firstMatch("hi 1 2", /\d/)).toBe("1");
        expect(Util.firstMatch("hi", /\d/)).toBeFalsy();
    });
    test("moduleName", () => {
        expect(Util.moduleName(module)).toBe("index.spec.ts");
    });
    test("moduleNameEx", () => {
        expect(Util.moduleNameEx()).toBe("index.spec.ts");
    });
    test("isPrimitive", () => {
        expect(Util.isPrimitive(2020)).toBeTruthy();
        expect(Util.isPrimitive(3.14)).toBeTruthy();
        expect(Util.isPrimitive(true)).toBeTruthy();
        expect(Util.isPrimitive("hi")).toBeTruthy();
        expect(Util.isPrimitive(Symbol("sym"))).toBeTruthy();
        expect(Util.isPrimitive(Number.NaN)).toBeTruthy();
        expect(Util.isPrimitive(null)).toBeTruthy();
        expect(Util.isPrimitive(undefined)).toBeTruthy();
        expect(Util.isPrimitive([])).toBeFalsy();
        expect(Util.isPrimitive({ object: true })).toBeFalsy();
        expect(Util.isPrimitive(() => "this is a function")).toBeFalsy();
    });
    test("caclms", () => {
        expect(Util.caclms(1)).toBe(3600000);
        expect(Util.caclms(0, 1)).toBe(60000);
        expect(Util.caclms(0, 0, 1)).toBe(1000);
        expect(Util.caclms(1, 1, 1)).toBe(3661000);
    });
    test("timestamp", () => {
        expect(Util.timestamp().toString().length).toBe(10);
    });
    test("mod", () => {
        expect(Util.mod(4, 2)).toBe(0);
        expect(Util.mod(4, 3)).toBe(1);
        expect(Util.mod(0, 3)).toBe(0);
        expect(Util.mod(1, 3)).toBe(1);
        expect(Util.mod(3, 3)).toBe(0);
        expect(Util.mod(-1, 3)).toBe(2);
        expect(Util.mod(-4, 2)).toBe(0);
        // expect(Util.mod(4, -2)).toBe(-0); // -0 wtf ???
    });
    test("precentWhatLeft", () => {
        expect(Util.precentWhatLeft(0, 1000)).toBe(100);
        expect(Util.precentWhatLeft(100, 1000)).toBe(90);
    });
    test("precentWhat", () => {
        expect(Util.precentWhat(0, 1000)).toBe(0);
        expect(Util.precentWhat(100, 1000)).toBe(10);
    });
    test("renameKey", () => {
        const obj = { old: "Hi" };
        Util.renameKey(obj, "old", "new");
        expect(obj).toEqual({ new: "Hi" });
    });
    test("getKey", () => {
        const obj = { a: "Hi", b: "Bye", c: { d: "Deep" } };
        expect(Util.getKey(obj, "Hi")).toEqual("a");
        expect(Util.getKey(obj, "Bye")).toEqual("b");
        expect(Util.getKey(obj, "Deep")).toBeUndefined();
        expect(Util.getKey(obj.c, "Deep")).toEqual("d");
    });
    test("factorial", () => {
        expect(Util.factorial(0)).toBe(1);
        expect(Util.factorial(5)).toBe(120);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    test.skip("time (should be always √)", () => { });
    test("dec2bin", () => {
        expect(Util.dec2bin(8)).toBe("1000");
        expect(Util.dec2bin(15)).toBe("1111");
        expect(Util.dec2bin(16)).toBe("10000");
        expect(Util.dec2bin(-1)).toBe("11111111111111111111111111111111");
    });
    test("bin2dec", () => {
        expect(Util.bin2dec("1000")).toBe(8);
        expect(Util.bin2dec("1111")).toBe(15);
        expect(Util.bin2dec("10000")).toBe(16);
        expect(Util.bin2dec("11111111111111111111111111111111")).toBe(-1);
    });
    test("bitRotate", () => {
        expect(Util.bitRotate(8, 1, true)).toBe(4);
        expect(Util.bitRotate(16, 2, true)).toBe(4);
        expect(Util.bitRotate(283, 7, true)).toBe(110);
        expect(Util.bitRotate(16, 1, false)).toBe(1);
        expect(Util.bitRotate(17, 2, false)).toBe(6); // 1 0001 (bits len 5) > 100 0100 | 0010 = 100 0110 > 0 0110 (removes bits)
        expect(Util.bitRotate(122, 7, false)).toBe(122);
        expect(Util.bitRotate(125, 10, true)).toBe(95);
        expect(Util.bitRotate(1022, 8, false)).toBe(767);
        expect(Util.bitRotate(33, 6, true)).toBe(33);
    });
    test("shallowCopy", () => {
        const obj = { a: 0, b: { c: 0 } };
        const copy = Util.shallowCopy(obj);
        obj.a = 1;
        obj.b.c = 1;
        expect(copy.a).toBe(0);
        expect(copy.b.c).toBe(obj.b.c); // nested object is shared between the original(source) and the copy(target).
    });
    test("deepCopy", () => {
        const obj = { a: 0, b: { c: 0 } };
        const copy = Util.deepCopy(obj);
        obj.a = 1;
        obj.b.c = 1;
        expect(copy.a).toBe(0);
        expect(copy.b.c).toBe(0);
    });
});

describe("Util (Formatted function)", () => {
    test("f_moduleTag", () => {
        expect(Util.f_moduleName(module)).toBe("[index.spec.ts]");
    });
    test("f_precentWhatLeft", () => {
        expect(Util.f_precentWhatLeft(0, 1000)).toBe("100%");
    });
});