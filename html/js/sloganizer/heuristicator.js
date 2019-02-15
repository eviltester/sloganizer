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
		var thisLetterArray =  wordlist[randomIntFromTo(0, maxlettersarray)];
		var randomWordPos = randomIntFromTo(0, thisLetterArray.length-1);

		// add random spaces in long acronyms
		if(acrospacecount>3){
			if(randomIntFromTo(0,2)==2){
				acrospacecount=0;
				acronym = acronym+" ";
			}
		}

		var randomWord = thisLetterArray[randomWordPos];
		acronym = acronym + randomWord.substr(0,1);
		acrowords.push(randomWord);

		acrospacecount++;
	}

	return {acronym: acronym, words: acrowords};

}