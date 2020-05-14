const cat1 = { name: '小美妞', age: 2, color: 'orange' };
const cat2 = { name: '大黑蛋', age: 2, color: 'black' };
const cat3 = { name: '小老虎', age: 2, color: 'orange' };


'Bad Code 💩'

console.log(cat1);
console.log(cat2);
console.log(cat3);



'Good Code ✅'

// Computed Property Names

console.log('%c My Friends', 'color: orange; font-weight: bold;')
console.log({ foo, bar, baz });

// Console.table(...)
console.table([foo, bar, baz])


// // Console.time
console.time('looper')

let i = 0;
while (i < 1000000) { i++ }

console.timeEnd('looper')

// // Stack Trace Logs

const deleteMe = () => console.trace('bye bye database')

deleteMe()
deleteMe()

