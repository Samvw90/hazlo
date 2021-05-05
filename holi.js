function createObject(name, number, date) {
    return { name, number, date };
}
// console.log(createObject('sam', 2));

const obj = createObject(undefined, 2, 'sgdsgdd');

for (let key in obj) {
    if (obj[key] === undefined) {
        delete obj[key];
    }
}

console.log(obj);
