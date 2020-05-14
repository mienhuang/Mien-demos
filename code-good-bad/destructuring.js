const cat = {
    name: '大黑',
    legs: 4,
    type: '中华田园猫',
    age: 2,
    color: 'black'
}

'Bad Code 💩'

function feed({ name, legs, type, age, color }) {
    return `我的猫名字是${cat.name}，它有${cat.legs}条腿，它今年${cat.age}岁了，它是一只${cat.color}颜色的${cat.type}`;
}


'Good Code ✅'

function feed({ name, legs, type, age, color }) {
    return `Feed ${name} ${meal} kilos of ${diet}`;
}

// OR

function feed(cat) {
    const { name, meal, diet } = cat;
    return `Feed ${name} ${meal} kilos of ${diet}`;
}



console.log(feed(turtle))