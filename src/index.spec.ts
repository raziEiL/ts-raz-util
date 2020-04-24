import { Hello } from ".";

describe("Test", () => {
    test("Hello", () => {
        expect(Hello()).toBe("hello world!");
    });
});