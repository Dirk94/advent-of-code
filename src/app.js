import {getAllRegexMatches, readFileAsLinesOfNumbers, readFileAsString, readFileAsTwoNumberArrays} from "./utils.js";
import {evaluateMul, getValidTokens, isDo, isDont, isMul} from "./parser.js";

function start() {
    const input = readFileAsString("./input/day-03.txt");
    getValidMulScore(input)

}

function getValidMulScore(input) {
    const tokens = getValidTokens(input)

    let total = 0;
    let mulEnabled = true
    for (const token of tokens) {
        if (isDo(token)) {
            mulEnabled = true;
            continue;
        }
        if (isDont(token)) {
            mulEnabled = false;
            continue;
        }
        if (isMul(token)) {
            if (!mulEnabled) {
                continue;
            }

            total += evaluateMul(token)
        }
    }

    console.dir({ total })
}

function getSafeReportCount(array) {
    const isSafe = (line) => {
        if (line.length <= 1) {
            return true;
        }

        const isIncreasing = line[1] > line[0]
        console.log(`${line[0]} is ${isIncreasing ? 'increasing' : 'descreasing'} to ${line[1]}`)

        for (let i=1; i<line.length; i++) {
            const previous = line[i-1]
            const current = line[i]

            if (current >= previous && !isIncreasing) {
                console.log(`  current (${current}) >= ${previous} and not increasing`)
                return false;
            }
            if (current <= previous && isIncreasing) {
                console.log(`  current (${current}) <= ${previous} and increasing`)
                return false;
            }

            const diff = Math.abs(current - previous)
            console.log(`  current (${current}) - previous (${previous}) = ${diff}`)
            if (diff < 1 || diff > 3) {
                return false;
            }
        }

        return true;
    }

    const isAtLeastOneLineSafe = (lines) => {
        for (const line of lines) {
            if (isSafe(line)) {
                return true;
            }
        }

        return false;
    }

    const getAllPossibleIterations = (line) => {
        const iterations = [line]
        for (let i=0; i<line.length; i++) {
            const copy = [...line]
            copy.splice(i, 1);
            iterations.push(copy)
        }
        return iterations
    }

    const safeReports = array.map(item => getAllPossibleIterations(item))
        .filter(item => isAtLeastOneLineSafe(item))
        .length

    console.log(`There are ${safeReports} safe reports`)
    return safeReports
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