const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

var tasks = [{id: 12, aperta: false, consegna: 'Di che colore è il sole? | rosso | blu | verde | giallo', risoluzione: 'A', punteggiomax: 10},
{id: 13, aperta: true, consegna: 'Testo della domanda aperta', risoluzione: 'soluzione della domanda aperta', punteggiomax: 15}
]

app.get('/tasks', (req, res) => {
res.json(tasks)
})

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

