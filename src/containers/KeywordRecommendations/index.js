import React, {Component} from 'react';

const API_KEY = `${process.env.REACT_APP_DB_API_KEY}`

class KeywordRecommendations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rawKeywordRecommendations: [],
        }
    }

    fetchKeywordRecs=(data, num)=>{
        let i;
        let pages = data.total_pages < 150 ? data.total_pages : 150
        for (i = 1; i <= pages; i++) {
            fetch(`https://api.themoviedb.org/3/discover/${this.props.type}?api_key=${API_KEY}&language=en-US&` +
                `sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&with_keywords=${num}`)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                   this.pushKeywordRecs(data)
                })
        }
    }

    pushKeywordRecs=(data)=>{
        data.results.forEach(movie => {
            if (movie.original_language !== "en") this.setState(previousState => ({
                rawKeywordRecommendations: [...previousState.rawKeywordRecommendations, movie]
            }))
        })
    }

    createKeywordFetch =(value )=>{ 
        value.forEach(num =>{ 
            fetch(`https://api.themoviedb.org/3/keyword/${num}/${this.props.type}?api_key=${API_KEY}`+
            `&language=en-US&include_adult=false`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.fetchKeywordRecs(data,num)
            })
        })
    }

    getRecommendations(){
        this.props.rawKeywordHandler(this.state.rawKeywordRecommendations)
    }

    returnRecommendations(){
        this.createKeywordFetch(this.props.keywords)
        setTimeout(() => {this.getRecommendations()}, 3000);
    }

    render(){
       
        return(
            <div>
                {this.state.rawKeywordRecommendations.length === 0 && 
                    this.returnRecommendations()}
            </div>
        )
    }
}

export default KeywordRecommendations;