import fs from 'fs'

export function readFileAsTwoNumberArrays(inputPath) {
    const asString = fs.readFileSync(inputPath).toString()
    const lines = asString.split("\n");

    const firstArray = []
    const secondArray = []

    for (const line of lines) {
        const parts = line.split(" ")
            .filter(item => item)
            .map(item => parseInt(item))

        firstArray.push(parts[0])
        secondArray.push(parts[1])
    }

    return [firstArray, secondArray]
}

export function readFileAsLinesOfNumbers(inputPath) {
    const asString = fs.readFileSync(inputPath).toString()
    const lines = asString.split("\n");

    return lines.map(
        item => item.split(" ")
            .map(item => parseInt(item))
    )
}
