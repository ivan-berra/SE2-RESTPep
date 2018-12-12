var fs = require('fs');

function esisteDeliveryExamId(searchedId) {
    //var imported = require('./deliveries.json');
    let imported = fs.readFileSync('db/deliveries.json', 'utf8', function(err, data) {
        if (err) throw err; // we'll not consexamIder error handling for now
        var obj = JSON.parse(data);
    });
    /*var re = /\0/g;
    var consegne=JSON.parse(imported.toString().replace(re, ""));*/
    let consegne = JSON.parse(imported);
    var lookingAt = searchedId;
    let tmp = consegne.deliveries[lookingAt];
    if (consegne.nextId <= searchedId)
        return -1;
    else if (tmp != null && tmp != undefined && tmp.examId == searchedId)
        return searchedId;
    else {
        let beginSearch = 0;
        let endSearch = consegne.deliveries.length - 1;
        lookingAt = ((beginSearch + endSearch) / 2);
        do {
            lookingAt = ((beginSearch + endSearch) / 2);
            tmp = consegne.deliveries[lookingAt];
            if (tmp == null) {
                let indice = lookingAt - 1;
                while (indice >= beginSearch && consegne.deliveries[indice] == null)
                    indice--;
                if (indice < beginSearch) {
                    indice = lookingAt + 1;
                    while (indice <= endSearch && consegne.deliveries[indice] == null)
                        indice++;
                    if (indice > endSearch)
                        return -1;
                    else {
                        tmp = consegne.deliveries[indice];
                        if (tmp.examId < searchedId)
                            beginSearch = indice + 1;
                        else if (tmp.examId > searchedId)
                            endSearch = indice - 1;
                        else if (tmp.examId == searchedId)
                            return indice;
                    }
                } else {
                    tmp = consegne.deliveries[indice];
                    if (tmp.examId < searchedId)
                        beginSearch = indice + 1;
                    else if (tmp.examId > searchedId)
                        endSearch = indice - 1;
                    else if (tmp.examId == searchedId)
                        return indice;
                }
            } else if (tmp.examId < searchedId)
                beginSearch = lookingAt + 1;
            else if (tmp.examId > searchedId)
                endSearch = lookingAt - 1;
            else if (tmp.examId == searchedId)
                return lookingAt;
        } while (beginSearch <= endSearch)
        return -1;
    }
}

module.exports = esisteDeliveryExamId;