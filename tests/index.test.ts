describe("Testes básicos", () => {
    // test('should <...> if/when <...>', () => {
    //    ...
    // });

    test("should return 2 if when sum 1 and 1", () => {
        const result = 1 + 1;
        console.log("O resultado foi " + result);

        expect(result).toBe(2);
    });
});
