import { useDeferredValue, useEffect, useState } from 'react';
import axios, * as others from 'axios';

function SearchSuggestions({searchText, suggestions}){

    console.log('Search Suggestion call');

    
    if(searchText!==''){
        console.log(suggestions);

        const suggestionsArr = suggestions.map(a =>  <div>{a}</div> );
    
        console.log('suggestionsArr => ', suggestionsArr);
    
        return (
            <div >
                {suggestionsArr}
            </div>
        );
    }

    return (<>{searchText}</>);
}

function SearchText(){

    const [searchText, setSearchText] = useState('');

    const deffText = useDeferredValue(searchText);

    // useEffect(()=>  console.log('deffText => ', deffText), [deffText]);

    const [suggestions, setSuggestions] = useState([]);


    useEffect(()=>{

        const options = {
            method: 'GET',
            url: 'https://youtube-data8.p.rapidapi.com/auto-complete/',
            params: {
            //   q:'cartoon',
              q: deffText,
              hl: 'en',
              gl: 'US'
            },
            headers: {
              'X-RapidAPI-Key': '618fb12b44msh0219149fe2ae4bep1bfc0cjsn692e90884bc9',
              'X-RapidAPI-Host': 'youtube-data8.p.rapidapi.com'
            }
          };
          
          async function getData(){
            try {
                const response = await axios.request(options);

                const dd =  response.data.results;

                console.log('search suggestions => ', dd);

                const arr = dd.map(a => a);

                setSuggestions();
                console.log('results => ', arr)

                setSuggestions(arr);
            } catch (error) {
                console.error(error);
            }
          }

          getData();

    }, [deffText])

    return (
        <div className="searchText">
            <input placeholder="Search" value={searchText} onChange={(e) => setSearchText( e.target.value.toString() ) }   type="text"></input>
            <SearchSuggestions searchText={searchText}  />
        </div>
    );
}

export default SearchText;