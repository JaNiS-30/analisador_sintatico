import { grammar, nonTerminals } from '../consts/consts';

export function randomSentence() {
  let rule = 'S';
  let generating = true;
  let sentence = '';
  while (generating) {
    let ruleLength = grammar[rule].length;
    let production = grammar[rule][Math.floor(Math.random() * ruleLength)];
    if (sentence === '') {
      sentence = production;
    } else {
      sentence = sentence.replace(rule, production);
    }
    let ruleIndex = -1;
    for (let i = 0; i < sentence.length; i++) {
      ruleIndex = nonTerminals.indexOf(sentence[i]);
      if (ruleIndex !== -1) {
        rule = nonTerminals[ruleIndex];
        break;
      }
    }
    if (ruleIndex === -1) {
      generating = false;
    }
  }
  sentence = sentence.replace('ε', '');
  if (sentence.indexOf('ε') !== -1) {
    sentence = sentence.replace('ε', '');
  }
  return sentence;
}
