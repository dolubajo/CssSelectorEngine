function findMatches(input, regex) {

    const items = new Set()
    while (input.length > 0) {
        if (regex.test(input)) {
            const [item] = input.match(regex)
            items.add(item)
            input = input.replace(item, '')
            continue
        }
        input = input.substring(1)
    }
    return [...items]
}

function intersection(sets) {

    if (sets.length === 1)
        return sets[0]

    let _intersection = new Set()

    for (let iSets = 0; iSets < sets.length; iSets++) {
        for (let elem of sets[iSets]) {
            for (let setI = 0; setI < sets.length; setI++) {
                if (sets[iSets] === sets[setI]) {
                    continue;
                }

                if (!sets[setI].has(elem)) {
                    continue;
                }

                if (setI === sets.length - 1) {
                    _intersection.add(elem)
                }
            }
        }
    }

    return _intersection
}

const CLASS_REGEX = /\.[a-zA-Z-_]+/
const ID_REGEX = /\#[a-zA-Z-_]+/
const TAG_REGEX = /div|input|img/

var $ = function (selector) {

    const idSet = new Set(findMatches(selector, ID_REGEX).flatMap($id))
    const classSet = new Set(findMatches(selector, CLASS_REGEX).flatMap($class))
    const tagSet = new Set(findMatches(selector, TAG_REGEX).flatMap($tag))

    const elements = intersection(
        [idSet, classSet, tagSet].filter(set => set.size > 0)
    )

    return [...elements]
}

const $id = (selector) => {
    const element = document.getElementById(
        String(selector).substring(1)
    )

    return element ? [element] : []
}

const $class = (selector) => {
    return [
        ...document.getElementsByClassName(
            String(selector).substring(1)
        )
    ]
}

const $tag = (selector) => {
    return [
        ...document.getElementsByTagName(
            String(selector)
        )
    ]
}
