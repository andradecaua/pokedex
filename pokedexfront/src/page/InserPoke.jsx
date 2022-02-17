import React from 'react'
import Api from '../Api'

export function Inserir(){

    function inserirPokemon(){
        const inputs = document.getElementsByTagName('input')

                const type = inputs[2].value.split(" ")
                const evolution = inputs[3].value.split(" ")

                const pokemon = {
                    name: inputs[0].value,
                    photo: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${inputs[1].value}.png`,
                    type: type,
                    evolution: evolution,
                }

                Api.post("/pokemons", pokemon).catch((err) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Pokemon inserido")
                    }
                })
    }

    return(
        <div>

            <input  type="text" placeholder='Nome'/>
            <input  type={'number'} placeholder='Foto'/>

            <input type="text" placeholder='Tipo'/>
            <input type="text" placeholder='Evolution' />

            <button onClick={inserirPokemon}>Inserir</button>
        </div>
    )
}