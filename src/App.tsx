import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pokedexbackground from './imgs/pokedex.png';
import styles from '../src/styles/pokedex.module.css';
import './App.css';
import { error } from 'console';
//
import Voltarportifolio from '../src/imgs/setapokedex.png';
import Logopokedex from '../src/imgs/Pokédex_logo.png';
import Backgroundpokedex from '../src/imgs/pokedex background.png'

function App() { 
   const [error, setError] = useState(false);
   const [data,setData] = useState<any>(null);
   const [name,setNome] = useState()
   const [type,setType] = useState()
   const [number,setNumber] = useState<number>(1);
   let [mostrarPokemon, setMostrarPokemon] = useState<boolean>(false);
   




   const URL= `https://pokeapi.co/api/v2/pokemon/${number}`
   const handleSearch = () => {
    setMostrarPokemon(true);
    setError(false);
  };


  useEffect(() => {
    handleSearch(); 

  }, []);

  useEffect(()=>{ 

     console.log(data);
     
     if (mostrarPokemon) { axios.get(URL).then((response) => {

     setType(response.data.types[0].type.name.charAt(0).toUpperCase() + response.data.types[0].type.name.slice(1));
     setData(response.data);
     setNome(response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1));
 

    
    }).catch((err)=>{
      setError(true);
    }).finally(()=>{
    setMostrarPokemon(false);
  })
  }
  },[URL,mostrarPokemon])


  return (
    <div className="App">
    <img src={Logopokedex} className={styles.logopokedex} alt="" />
    <input placeholder='Nº do Pokémon' className={`${styles.inputseach} ${error ? styles.error:""}`} type={"number"} onChange={(e)=>
      {setNumber(parseInt(e.target.value))}} />
    <button className={styles.buttonseach} onClick={handleSearch}>Procurar</button>


<div className={styles.pokedexall}>
    
    <img className={styles.pokemon} src=
    {data?data.sprites.front_default:
    "<p>Carregando...</p>"} alt="" />
    <img className={styles.pokedex} src={Pokedexbackground} alt="" />
    <img className={styles.Pokedexbackground} src={Backgroundpokedex} alt="" />

</div>


  <div className={styles.infopokedex}>
          <h2 className={styles.namepokemon}>{name}</h2>
          <h4 className={styles.typepokemon}
       style = {type === "Fire" ?{color: "orange"}
       : type === "Water" ? {color:"Aqua "}
       : type === "Psychic" ?{color:"rgb(179, 0, 250)"}
       : type === "Fighting" ?{color:"red"}
       : type === "Bug" ? {color:"orangered"}
       : type === "Fairy"?{color:"DeepPink"}
       : type === "Poison"?{color:"DarkViolet"}
       : type === "Electric"?{color:"Gold"}
       : type === "Ground"?{color:"GoldenRod"}
       : type === "Rock"?{color:"DarkGoldenRod"}
       : type === "Normal"?{color:"BurlyWood"}
       : type === "Dragon"?{color:"DarkSlateBlue"}
       : type === "Ghost"?{color:"Maroon"}
       :{}}>{type} </h4>
          <p className={styles.habilidades}>Habilidades:</p>
    </div>
    <p className={styles.desenvolvido}>Desenvolvido por : <a href="https://github.com/PedroPaulo-Git"> Pedro</a></p>
   <a href="https://pedropaulo-git.github.io/MyRepository-in-React/">
    <img className={styles.voltarportifolio} src={Voltarportifolio} alt="" /></a> 




    {data?data.abilities.map((value:any,key:any)=>{

      return(
        
        <div
        key={key} className={`${styles.habilidadepokedex}
         ${styles['habilidade' + (key + 1)]}`}
      >
          
          {key === 0 ? 
           `→ ${value.ability.name}`:`${value.ability.name}`}

          
    
        </div> 
      )
    }):""}
    
    </div>
  );
}

export default App;
