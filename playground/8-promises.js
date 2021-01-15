const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // We can't call resolve reject again and again.
        // resolve("SUCCESS")
        reject("ERROR")
    }, 2000);
})

doWorkPromise.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
})


                            // / fulfilled
// Promise ------> pending
                            // / rejected
