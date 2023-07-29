import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pokedexbackground from './imgs/pokedex.png';
import styles from '../src/styles/pokedex.module.css';
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


<div className={styles.pokedexall}>

    <img className={styles.pokedex} src={Pokedexbackground} alt="" />
    <img className={styles.pokemon} src=
    {data?data.sprites.front_default:
    "<p>Carregando...</p>"} alt="" />

</div>


  <div className={styles.infopokedex}>
          <h2>{name}</h2>
          <h2>Peso : {weight}</h2>
          <p>Habilidades:</p>
    </div>
    

    {data?data.abilities.map((value:any,key:any)=>{

      return(
        
        <div
        key={key}
        className={`${styles.habilidadepokedex} ${styles['habilidade' + (key + 1)]}`}
      >
          
          {value.ability.name}
          
    
        </div> 
      )
    }):""}
    
    </div>
  );
}

export default App;
