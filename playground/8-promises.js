const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
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

