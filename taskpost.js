//input è l'oggetto JSON task che deve avere le proprietà
//aperta (boolean, not null), consegna (string, not null), risoluzione (string), punteggio (integer, not null)

function taskpost(aperta, consegna, risoluzione, punteggio){
	if(typeof aperta === "boolean" &&  aperta != null){
		if(typeof consegna === "string" && consegna != null){
			if(typeof risoluzione === "string" || typeof risoluzione === 'null' || typeof risoluzione === 'undefined'){
				if (Number.isInteger(punteggio))
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

module.exports = taskpost;
