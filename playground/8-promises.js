// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // We can't call resolve reject again and again.
//         // resolve("SUCCESS")
//         reject("ERROR")
//     }, 2000);
// })

// doWorkPromise.then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.log(error);
// })


//                             // / fulfilled
// // Promise ------> pending
//                             // / rejected


const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b);
        }, 2000)
    })
}

// add(1,2).then(sum => {
//     console.log(sum);
//     add(sum, 5).then(sum2 => {
//         console.log(sum2);
//     }).catch(e =>{
//         console.log(e);
//     })
// }).catch(e => {
//     console.log(e);
// })

add(1,2).then(sum => {
    console.log(sum);
    return add(sum, 4);
}).then(sum2 => {
    console.log(sum2);
}).catch(e => {
    console.log(e);
})