const distribute = (name) => Promise.resolve(`${name} 拿到小鱼干了！`);
const start = () => Promise.resolve('开始');



start()
.then(() => {
    return distribute('大黑');
})
.then(() => {
    return distribute('小美妞');
})
.then(() => {
    return distribute('小老虎');
})
.then(() => {
    console.log('大家都拿到小鱼干了');
})


const random = () => {
    return Promise.resolve(Math.random())
}

'Bad Promise Code 💩'

const sumRandomAsyncNums = () => {
    let first;
    let second;
    let third;

    return random()
        .then(v => {
            first = v;
            return random();
        })
        .then(v => {
            second = v;
            return random();
        })
        .then(v => {
            third = v;
            return first + second + third
        })
        .then(v => {
            console.log(`Result ${v}`)
        });
}


'Good Promise Code ✅'

const sumRandomAsyncNums = async () => {

    const first = await random();
    const second = await random();
    const third = await random();

    console.log(`Result ${first + second + third}`);

    if (await random()) {
        // do something
    }

    const randos = Promise.all([
        random(),
        random(),
        random()
    ])

    for (const r of await randos) {
        console.log(r)
    }


}



sumRandomAsyncNums()