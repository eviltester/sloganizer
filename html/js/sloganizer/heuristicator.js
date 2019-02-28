function randomIntFromTo(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function createAnAcronym(wordlist){

	var maxlength = 10;
	var minlength = 3;

	var length = randomIntFromTo(minlength, maxlength);

	var acronym = "";
	var acrowords = [];
	var acrospacecount = 0;

	var maxlettersarray = wordlist.length-1;

	for(var pos=0; pos<length; pos++){
		// pick a random letter
		var thisLetterArray =  wordlist[randomIntFromTo(0, maxlettersarray)];

		// pick a random word
        // TODO: need to avoid duplicate words
		var randomWordPos = randomIntFromTo(0, thisLetterArray.length-1);

        // add random spaces in long acronyms
		if(shouldIAddASpaceBasedOnWordLengthProbability(acrospacecount)){
            acrospacecount=0;
            acronym = acronym+" ";
		}


		var randomWord = thisLetterArray[randomWordPos];
		acronym = acronym + randomWord.substr(0,1);
		acrowords.push(randomWord);

		acrospacecount++;
	}

	return {acronym: acronym, words: acrowords};

}

function shouldIAddASpace(wordlen){

    if(wordlen>3) {
        if (randomIntFromTo(0, 2) == 2) {
            return true;
        }
    }
    return false;
}

function shouldIAddASpaceBasedOnWordLengthProbability(wordlen){

    // distribution in a heuristic mnemonic will be different
	// e.g for 8 character word max % chance of a space after a letter would be the number
    var heuristicWordDistributions = [0,3,7,10,15,20,20,15,10];

    var currentPercentageForSpace =0 ;

    for(var percentagepos=0;
		percentagepos<heuristicWordDistributions.length  &&
		percentagepos<=wordlen; percentagepos++){

        	currentPercentageForSpace = currentPercentageForSpace + heuristicWordDistributions[percentagepos];
	}

    if (randomIntFromTo(1, 100) <= currentPercentageForSpace) {
            return true;
    }

    return false;
}


// max len 15 -based on http://www.ravi.io/language-word-lengths
var wordDistributions = [0,0.1,0.1,0.6,2.6,5.2,8.5,12.2,14,14,12.6,10.1,7.5,5.2,3.2,2.0];

// probability would be all previous added together
// 0 = 0
// 1 = 0.1
// 2 = 0.2
// 3 = 0.8



// assume chance of vowel or consonant 50/50

// distribution of word lengths could give us a % of adding a space
// http://www.ravi.io/language-word-lengths
// 1 0.1
// 2 0.1
// 3 0.6
// 4 2.6
// 5 5.2
// 6 8.5
// 7 12.2
// 8 14
// 9 14
// 10 12.6
// 11 10.1
// 12 7.5
// 13 5.2
// 14 3.2
// 15 2.0






// vowel or consonant
// last

// http://www.yougowords.com/1-consonants-in-a-row
// 1 consonant 99018    100
// 2 consonants 84209    84
// 3 consonants 28091    28
// 4 consonants 6463      6
// 5 consonants 1228      2


// http://www.yougowords.com/3-vowels-in-a-row
// 1 vowels 98684     100
// 2 vowels 35013      35
// 3 vowels 2241        2
// 4 vowels 47          0