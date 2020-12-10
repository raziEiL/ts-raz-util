import fs from "fs";
import path from "path";

export interface RandomFunc {
    (min: number, max: number, maxInclusive?: boolean): number;
}
// Regular expression
export const REGEX_BASE64 = /^data:([+/A-Za-z-]+);base64,(.+)$/;
export const REGEX_COMMAND_LINE = /".+"|'.+'|\S+/g;
export const REGEX_FILENAME = /[^/\\]+\.(.+)$/;
export const REGEX_QUOTES = /^"|"$|^'|'$/g; // detects only start and end quotes
// Pure function
export const commandArgs = (s: string) => { const m = s.match(REGEX_COMMAND_LINE); if (m) return m.map(s => s.replace(REGEX_QUOTES, "")); };
export const firstMatch = (s: string, regex: RegExp) => { const r = s.match(regex); return r ? r[0] : undefined };
export const moduleName = (m: NodeModule): string => firstMatch(m.filename, REGEX_FILENAME) || "NULL!";
export const moduleNameEx = () => module.parent ? (firstMatch(module.parent.filename, REGEX_FILENAME) || "NULL!") : "NULL!";
export const isPrimitive = (val: any): boolean => val === null || (typeof val !== "object" && typeof val !== "function");
export const caclms = (h: number, m = 0, s = 0) => (h * 3600 + m * 60 + s) * 1000;
export const timestamp = () => Math.floor(Date.now() / 1000); // Unix time in seconds
export const mod = (x: number, n: number) => (x % n + n) % n;
export const precentWhatLeft = (current: number, max: number): number => Math.floor((max - current) / max * 100);
export const precentWhat = (current: number, max: number): number => Math.floor(current * 100 / max);
export const renameKey = (obj: any, oldKey: any, newKey: any) => { delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey] };
export const getKey = (obj: any, value: any) => Object.keys(obj).find(key => obj[key] === value);
export const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1); // 5! = 1*2*3*4*5=120
export const time = () => { const time = new Date(); return `${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}` };
export const escapeJSON = (s: string) => s.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
// copy obj
export const shallowCopy = (obj: any) => Object.assign({}, obj); // copy top-level properties and methods
export const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj)); // copy every object expect methods
// bits
export const dec2bin = (dec: number) => (dec >>> 0).toString(2); // to uint32
export const bin2dec = (bin: string) => Number.parseInt(bin, 2) >> 0; // to int32
export const bitRotate = (n: number, m: number, right: boolean) => {
    const bin = dec2bin(n);
    m %= bin.length;
    return bin2dec(right ? bin.slice(-m) + bin.slice(0, -m) : bin.slice(m) + bin.slice(0, m));
};

// random numbers
export const generateRandomNums = (func: RandomFunc, count: number, min: number, max: number, maxInclusive?: boolean) => {
    const array = [];
    for (let i = 0; i < count; i++)
        array.push(func(min, max, maxInclusive));
    return array
};

export const getRandomArbitrary = (min: number, max: number) =>
    Math.random() * (max - min) + min;

export const getRandomInt = (min: number, max: number, maxInclusive?: boolean) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + (maxInclusive ? 1 : 0))) + min;
};

// files
export const getFilesListRecursively = (dir: string) => {
    let results: string[] = [];

    fs.readdirSync(dir).forEach((file) => {
        file = path.join(dir + "/" + file);
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory())
            results = results.concat(getFilesListRecursively(file));
        else
            results.push(file);
    });

    return results;
};

// sleep thread
export const sleep = (ms: number) => new Promise(res => { setTimeout(res, ms) });
export const sleepSync = (milliseconds: number) => {
    const date = Date.now();
    let currentDate;
    do {
        currentDate = Date.now() - date;
    } while (currentDate < milliseconds);
};

// Formatted function
export const f_moduleName = (m: NodeModule): string => `[${moduleName(m)}]`;
export const f_precentWhatLeft = (current: number, max: number): string => precentWhatLeft(current, max) + "%";