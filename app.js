import fs from 'fs'
import {readFileAsTwoSortedNumberArrays} from "./utils.js";

function start() {
    const [firstArray, secondArray] = readFileAsTwoSortedNumberArrays('./input/day-01-01.txt');
    if (firstArray.length !== secondArray.length) {
        console.error("array sizes are not equal")
        return;
    }

    let totalDifference = 0
    for (let i=0; i<firstArray.length; i++) {
        const difference = Math.abs(
            firstArray[i] - secondArray[i]
        )
        console.log(`${firstArray[i]} - ${secondArray[i]} = ${difference}`)

        totalDifference += difference
    }

    console.log(`Total difference = ${totalDifference}`)
}

start()