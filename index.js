const fs = require('fs');

// Lagrange Interpolation Function
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;

        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= -points[j].x / (xi - points[j].x);
            }
        }
        constantTerm += term;
    }

    return constantTerm;
}

// Function to decode the y-value based on its base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Main function to solve the problem
function solve(input) {
    const keys = input.keys;
    const n = keys.n;
    const k = keys.k;
    let points = [];

    // Parse and decode the input points
    for (let i = 1; i <= n; i++) {
        if (input[i]) {
            let x = parseInt(i); // x is the key
            let base = parseInt(input[i].base); // base of y
            let value = input[i].value; // y value in the given base
            let y = decodeValue(base, value); // decode y
            points.push({ x, y });
        }
    }

    // We only need k points for interpolation
    points = points.slice(0, k);

    // Perform Lagrange interpolation to find the constant term
    const constantTerm = lagrangeInterpolation(points, k);

    return constantTerm;
}

// Read input from JSON file
const inputJSON = fs.readFileSync('input.json', 'utf-8');
const input = JSON.parse(inputJSON);

// Solve the problem
const result = solve(input);

console.log("The constant term (c) is:", result);
