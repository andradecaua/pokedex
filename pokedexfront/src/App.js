import  {useState} from 'react'
import './style/pagestyle.scss'

import Api from './Api'

export function App() {

  const [evolution, setEvoutions] = useState([])

  const [pokemon, setPokemon] = useState({nome: "", type: [], photo: "", evolution})
  
  function getPokemonStatus(){

    const namePokemon = document.getElementsByTagName("input")[0].value

    Api.get("/pokemons").then((res) => {

      for(let index in res.data){
        
        const pokemonStatus = res.data[index]

        if(namePokemon === pokemonStatus.name){

           let evolutionArray = []

           if(pokemonStatus.evolution[0] !== "Nenhuma"){

             for(let pokemonEI in pokemonStatus.evolution){

                for(let index in res.data){
                  if(pokemonStatus.evolution[pokemonEI] === res.data[index].name){
                    evolutionArray.push(res.data[index])
                  }
                }

             }

              setEvoutions(evolutionArray)
              return setPokemon(pokemonStatus)
           }
           if(pokemonStatus.evolution[0] === "Nenhuma"){
             setPokemon(pokemonStatus)
             setEvoutions([])
           }

        }
      }
    

    })
  
  }

  return (
   <div id="main">

     <div id="pokemonArea">
          <span>{pokemon.name}</span>
          <img src={pokemon.photo} width={240}  height={240} alt={`Imagem do pokemon`} />
     </div>

     <div id="pokemonsType">

        <div id="pokemonType">
          {pokemon.type.map((item, index) => {
            return(
              <span key={`${item+index}`}>{item}</span>
            )
          })}
        </div>
        <div id="pokemonWeakness"></div>

     </div>

     <div id="pokemonsEvolutions">
       {evolution.map((item, index) => {
         return(
           <div key={index+item}>
              <span key={item.name}>{item.name}</span>
              <img key={item.name+index} alt={`Foto do pokémon `+ item.name} src={item.photo}/>
           </div>
         )
       })}
     </div>

     <div id="areadeprocura">

          <input id="procurainput" type="search" onChange={getPokemonStatus} />
     </div>

   </div>
  );
}


