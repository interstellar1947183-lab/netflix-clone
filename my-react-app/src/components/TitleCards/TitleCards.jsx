import React,{useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/assets/cards/Cards_data.js'
import {Link} from 'react-router-dom'


const TitleCards = ({title,category}) => {

    const [apiData,setApiData] = useState([]);
    const cardsRef= useRef();

    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`
  }
};



    // console.log("cardsref",cardsRef)
    // console.log("cardsref dom",cardsRef.current)

const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft +=event.deltaY;
}

useEffect(()=>{
  cardsRef.current.addEventListener('wheel',handleWheel)

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
   .then(response => {
    console.log("Response object:", response);
    return response.json();
  })
  .then(data => {
    console.log("Parsed JSON data:", data);
    console.log("Movie results:", data.results);
    setApiData(data.results);
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
},[])

  return (
    <div className='title-cards'>
      <h2>{title ? title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
             <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
             <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards
