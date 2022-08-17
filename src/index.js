module.exports = function check(str, bracketsConfig) {
    let brackets = [];
    let openBrackets = [];
    for (let i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
            brackets.push(bracketsConfig[i][0]);
        } else {
            openBrackets.push(bracketsConfig[i][0]);
        };
    };

    const bracketsPairs = bracketsConfig.map(([key, value]) => ({
        [value]: key
    }));
    const bracketsPair = Object.assign(...bracketsPairs);

    let stack = [];
    for (let i = 0; i < str.length; i++) {
        let currentSymbol = str[i];
        let topElement = stack[stack.length - 1];

        if (brackets.includes(currentSymbol)) {
            if (currentSymbol === topElement) {
                stack.pop();
            } else {
                stack.push(currentSymbol);
            };
        } else {
            if (openBrackets.includes(currentSymbol)) {
                stack.push(currentSymbol);
            } else {
                if (stack.length === 0) {
                    return false;
                }
                if (bracketsPair[currentSymbol] === topElement) {
                    stack.pop();
                } else {
                    return false;
                };
            };
        };
    };
    return stack.length === 0;
};