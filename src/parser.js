
export function getValidTokens(input) {
    let normalized = normalize(input)

    const tokens = []

    while (normalized.length > 0) {
        const token = getTokenOfRegex(normalized, [
            /^(mul\(\d+,\d+\))/gm,
            /^do\(\)/gm,
            /^don't\(\)/gm,
        ])
        if (token) {
            tokens.push(token)
            normalized = normalized.slice(token.length)
            continue
        }

        normalized = normalized.slice(1)
    }

    return tokens
}

export function isMul(token) {
    return token.includes('mul')
}
export function isDo(token) {
    return token.includes('do()')
}

export function isDont(token) {
    return token.includes('don\'t()')
}

export function evaluateMul(mul) {
    const n1 = mul.substring(mul.indexOf('(') + 1, mul.indexOf(','))
    const n2 = mul.substring(mul.indexOf(',') + 1, mul.indexOf(')'))

    return parseInt(n1) * parseInt(n2)
}

function getTokenOfRegex(normalized, regexes) {
    for (const regex of regexes) {
        const matches =  regex.exec(normalized)
        if (!matches) {
            continue;
        }

        return matches[0]
    }

    return null
}

function normalize(code) {
    return code?.toLowerCase() || ''
}
