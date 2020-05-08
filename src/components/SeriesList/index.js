import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ISO6391 from 'iso-639-1';

const imageUrl = (img) =>  {
    return img != null ? `https://image.tmdb.org/t/p/w500/${img}` : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
}

const nonEnglishName = (name)=>{
    if (name.name != name.original_name) return `Engligh Title: ${name.name}` 
}

const checkForNull = (props) =>{
    return props.list === null ? true : false
}

const SeriesList = (props) =>{
    if (checkForNull(props) === false) {
    return(
        <div> {props.list.map(series =>
            <li style={{ listStyleType: "none" }}>
                <img src={imageUrl(series.poster_path)} alt={series.original_name+" poster."} width="20%" height="40%"/>
                <br/>
                <h2><b>{series.original_name}</b></h2>
                <h4>{nonEnglishName(series)}</h4>
                {ReactHtmlParser(series.overview)}
                <br/>
                <br />
                {ReactHtmlParser(`Original language: <b>${ISO6391.getName(series.original_language)}</b>`)}
                <br />
                <br />
            </li>)}
        </div>
    )
    } else {
        return (
        <div>
            <h1>No results found. Please try another series.</h1>
        </div>
        )
    }
}
export default SeriesList;