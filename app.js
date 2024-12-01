import fs from 'fs'
import {readFileAsTwoNumberArrays} from "./utils.js";

function start() {
    const [firstArray, secondArray] = readFileAsTwoNumberArrays('./input/day-01-01.txt');

    // Puzzle 01
    // getTotalDifferenceBetweenNumberArrays(firstArray, secondArray)

    // Puzzle 02
    getSimilarityScore(firstArray, secondArray)

}

function getSimilarityScore(firstArray, secondArray) {
    let totalSimilarity = 0

    for (let i=0; i<firstArray.length; i++) {
        const firstArrayNumber = firstArray[i]

        const occurrencesInSecondArray = secondArray.filter(item => item === firstArrayNumber)
            .length

        const similarity = firstArrayNumber * occurrencesInSecondArray
        console.log(`${firstArrayNumber} found ${occurrencesInSecondArray} in second array -> ${similarity}`)
        totalSimilarity += similarity
    }

    console.log(`Total similarity = ${totalSimilarity}`)
    return totalSimilarity;
}

function getTotalDifferenceBetweenNumberArrays(firstArray, secondArray) {
    const firstArraySorted = firstArray.sort()
    const secondArraySorted = secondArray.sort()

    let totalDifference = 0
    for (let i=0; i<firstArray.length; i++) {
        const difference = Math.abs(
            firstArraySorted[i] - secondArraySorted[i]
        )
        console.log(`${firstArraySorted[i]} - ${secondArraySorted[i]} = ${difference}`)

        totalDifference += difference
    }

    console.log(`Total difference = ${totalDifference}`)
    return totalDifference
}

start()