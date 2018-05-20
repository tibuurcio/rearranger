const recast = require('recast');

module.exports = (code) => {
    const ast = recast.parse(code);
    const calls = [], functions = {};

    ast.program.body.forEach(el => {
        if (el.type === 'ExpressionStatement' && el.expression.type === 'CallExpression') {
            calls.push(el.expression.callee.name);
        }
        else if (el.type === 'FunctionDeclaration') {
            functions[el.id.name] = el;
        }
    });

    const astWithoutFunctions = { ...ast };
    astWithoutFunctions.program.body = ast.program.body.filter(el => el.type !== 'FunctionDeclaration')

    calls.forEach(functionName => {
        astWithoutFunctions.program.body.push(functions[functionName]);
    });
    return recast.print(astWithoutFunctions).code;
};