import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { error } from 'console';

function App() {
   const [data,setData] = useState<any>(null);
   const [name,setNome] = useState()
   const [weight,setWeight] = useState()
   const [number,setNumber] = useState<number>(1);
   let [mostrarPokemon, setMostrarPokemon] = useState<boolean>(false);
   



   const URL= `https://pokeapi.co/api/v2/pokemon/${number}`
   const handleSearch = () => {
    setMostrarPokemon(true);
  };
  useEffect(()=>{
     if (mostrarPokemon) { axios.get(URL).then((response) => {
     console.log(data)
     setWeight(response.data.weight);
     setData(response.data);
     setNome(response.data.name);
 


    }).catch((err)=>{
      window.alert(err);
    }).finally(()=>{
    setMostrarPokemon(false);
  })
  }
  },[URL,mostrarPokemon])


  return (
    <div className="App">
    <h1>Pokedex</h1>
    <input type={"number"} onChange={(e)=>
      {setNumber(parseInt(e.target.value))}} />
    <button onClick={handleSearch}>Procurar</button>


    <h2>Nome : {name}</h2>
    <h2>Peso : {weight}</h2>
    <img src=
    {data?data.sprites.other.dream_world.front_default:
    "<p>Carregando...</p>"} alt="" />
    <p>Minhas Habilidades são:</p>
    {data?data.abilities.map((value:any,key:any)=>{
      return(
        <div key = {key}>
          {value.ability.name}
        </div>
      )
    }):""}
    
    </div>
  );
}

export default App;
