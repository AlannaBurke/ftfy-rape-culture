var elements = document.getElementsByTagName('*');

var sourceWordsToTargetWords = [
    [['former Stanford University swimmer', 'Stanford swimmer', 'convicted Stanford swimmer', 'ex-Stanford swimmer', 'former Stanford swimmer', 'Stanford sex offender', 'Former Stanford Swimmer', 'Former Stanford swimmer', 'Stanford University swimmer', 'All-American swimmer', 'Stanford freshman', 'member of Stanford’s varsity swim team', 'record-setting swimming prodigy', 'Stanford athlete', 'Olympic hopeful'], 'convicted rapist'],
    [['former Stanford University swimmer Brock Turner', 'Stanford swimmer Brock Turner', 'convicted Stanford swimmer Brock Turner', 'ex-Stanford swimmer Brock Turner', 'former Stanford swimmer Brock Turner', 'Stanford sex offender Brock Turner', 'Former Stanford Swimmer Brock Turner', 'Former Stanford swimmer Brock Turner', 'freshman Brock Turner'], 'convicted rapist Brock Turner'],
];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(sourceWordsToTargetWords, modifyWords) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, identity).concat(makeRegexToTargetWords(sourceWordsToTargetWords, capitalizeFirstLetter)).concat(makeRegexToTargetWords(sourceWordsToTargetWords, toUpperCase));

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
