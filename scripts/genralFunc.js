export function displayArray(arr) {
    console.log(`Current Arr:`);
    arr.forEach(elem => {
        console.log(`${elem}`);
    });
}

export function displayBoardLog (arr) {
    console.log('Current Board Log:');
    console.log('----------------');
    arr.forEach(elem => {
        for (let i = 0; i < 9; i += 3) {
            console.log(`${elem[i]} | ${elem[i+1]} | ${elem[i+2]}  --(${Math.floor(i/3) + 1})`);
        };
        console.log('----------------');
    });
    
}