//input è l'oggetto JSON task che deve avere le proprietà
//aperta (boolean, not null), consegna (string, not null), risoluzione (string), punteggio (integer, not null)

function taskpost(aperta, consegna, risoluzione, punteggio){
	if(typeof aperta === "boolean" &&  aperta != null){
		if(typeof consegna === "string" && consegna != null){
			if(typeof risoluzione === "string" || typeof risoluzione === 'null' || typeof risoluzione === 'undefined'){
				//controllo se le crocette sono formattate bene
				if(aperta == false){
					if(!(checkConsegnaCrocette(consegna) && checkRisoluzioneCrocette(risoluzione))){
					return 400;
					}
				}
				//controllo se il punteggio è un intero maggiore di 0
				if (Number.isInteger(punteggio) && punteggio > 0)
				{
					return 200;
				}
				else return 400;
			}
			else return 400;
		}
		else return 400;
	}
	else return 400;
}

//controlla se la formattazione della consegna nelle crocette è corretta
//le scelte devono essere separate da ' | '.  Es: domanda | opzione 1 | opzione 2 => OK
function checkConsegnaCrocette(consegna){
	let lunghezza = consegna.length;
	let pipeCounter = 0;

	//controllo dalla seconda lettera (visto che almeno una deve essere di domanda) 
	//e fino alla penultima visto che l'ultima anche se fosse | non mi da una scelta in piu
	//se trovo un simbolo '|' preceduto da uno spazio e non '||' allora conto che c'è una scelta in piu
	for(let i = 1; i < lunghezza-1; i++){
		if(consegna.charAt(i) == '|' && consegna.charAt(i-1) == ' ' && consegna.charAt(i+1) != '|'){
			pipeCounter++;
		}
	}
	//ci devono essere minimo 2 scelte
	if(pipeCounter > 1) return true;
	else return false;
}

//controlla se la formattazione della risoluzione delle crocette è corretta
//le risposte indicate sono indicate da numeri. 1 per la prima opzione ecc... se ci sono piu risposte sono separate da ' | ' 
//i numeri delle risposte non possono essere ripetuti e vanno messi in ordine crescente (??non so se serve, ma farebbe comodo se c'è da fare la correzione automatica??)
//es: 1 | 2 | 3 => OK
function checkRisoluzioneCrocette(risoluzione){
	let array = risoluzione.split('|');
	for(let i = 0; i < array.length;  i++){
		let num = parseInt(array[i]);
		//se il valore non è intero la formattazione è sbagliata
		if(!(Number.isInteger(num))) return false;
	}
	return true;
}
module.exports = taskpost;
