
const catsWeight = [3000, 4900, 5.2];


'Bad Loop Code 💩'

const totalWeight = 0;
const overWeightCats = [];
const reduceHalf = [];
for (i = 0; i < catsWeight.length; i++) { 

    totalWeight += catsWeight[i];

    if (catsWeight[i] > 4500) {
        overWeightCats.push(catsWeight[i])
    }

    reduceHalf.push(catsWeight[i] / 2);
}


'Good Loop Code ✅'

// Reduce
const total = orders.reduce((acc, cur) => acc + cur)

// Map
const withTax = orders.map(v => v * 1.1)

// Filter
const highValue = orders.filter(v => v > 100);

const hasCatWeightOver5000 = catsWeight.some(c => c > 5000)

/**
 * Every
 * @returns false
 */
const everyValueGreaterThan50 = orders.every(v => v > 50)

/**
 * Every
 * @returns true
 */
const everyValueGreaterThan10 = orders.every(v => v > 10)


/**
 * Some
 * @returns false
 */
const someValueGreaterThan500 = orders.some(v => v > 500)

/**
 * Some
 * @returns true
 */
const someValueGreaterThan10 = orders.some(v => v > 10)



