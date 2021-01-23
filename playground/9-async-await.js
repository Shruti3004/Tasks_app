const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0 || b<0){
                return reject('Nos. Must be non-negative')
            }
            resolve(a+b);
        }, 2000)
    })
}

const doWork = async () => {
    // return 'Shruti';
    // throw new Error('Something went wrong!')
    const sum = await add(2,3);
    const sum2 = await add(sum,5);
    return sum3 = await add(sum2, -10);
}
doWork().then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
})
// console.log(doWork());