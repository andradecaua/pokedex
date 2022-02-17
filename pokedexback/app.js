const express = require("express")
const nodemon = require("nodemon")
const cors = require('cors')
const fs = require("fs")
const { randomUUID } = require("crypto")

const port = 4000

//Inicio do back-end 




const app = express()
app.use(cors())

app.use(express.json())




let pokemons = []




fs.readFile('pokemon-list.json', 'utf-8', (err, data) => {
    if(err){
        console.log(err)
    }else{
       pokemons = JSON.parse(data)
    }
})

app.get("/pokemons", (req, res) => {

    res.json(pokemons)
    
})

app.post("/pokemons", (req, res) => {
    
    const {name, type, photo, evolution} = req.body

    console.log(req.body)
   
    const pokemon = {
        name,
        type,
        photo,
        evolution,
    }

    pokemons.push(pokemon)

    const valor = JSON.stringify(pokemons)

    atualizarArquivo(valor)

    res.json(pokemon)
})

function atualizarArquivo(valor){

    fs.writeFile("pokemon-list.json", valor, (err) => {
        if(err){
            console.log(err)
        }else{
            console.log("JSON Atualizado")
        }
    })
}


//Fim do back-end
app.listen(port, () => {

    console.log("Servidor rodando na porta 4000")

})