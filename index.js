const fs = require('fs');
const acorn = require('acorn');
const escodegen = require('escodegen');

const fileContent = fs.readFileSync('tests/test.js', 'utf8');
const comments = [], tokens = [];
const ast = acorn.parse(fileContent, { 
    location: true, 
    ranges: true, 
    onComment: comments,
    onToken: tokens
});

const calls = [], functions = {};

ast.body.forEach(el => {
    if (el.type === 'ExpressionStatement' && el.expression.type === 'CallExpression') {
        calls.push(el.expression.callee.name);
    }
    else if (el.type === 'FunctionDeclaration') {
        functions[el.id.name] = el;
    }
});

const astWithoutFunctions = { ...ast, body: ast.body.filter(el => el.type !== 'FunctionDeclaration') };

calls.forEach(functionName => {
    astWithoutFunctions.body.push(functions[functionName]);
});

// attach comments using collected information
escodegen.attachComments(astWithoutFunctions, comments, tokens);

const newCode = escodegen.generate(astWithoutFunctions, {
    comment: true
});

fs.writeFileSync('tests/test_result.js', newCode, 'utf8');