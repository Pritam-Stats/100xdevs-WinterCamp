console.log("start");

function setTimeoutPromisified(duration) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log(`hellooo, after ${duration}ms`)
        }, duration);
    })
}

//call
// setTimeoutPromisified(2000)
//     .then(() => console.log("done"));


async function callSetTimeoutPromisified() {
    await setTimeoutPromisified(2000)
}

callSetTimeoutPromisified();

console.log("end");
