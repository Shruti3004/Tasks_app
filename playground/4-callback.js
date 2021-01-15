const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!!', undefined);
        callback(undefined, 'SUCCESS!' );
    }, 2000)
}
doWorkCallback((error, result) => {
    if(error){
        return console.log(error);
    }
    console.log(result);
})