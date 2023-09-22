import { useEffect, useState } from "react";
import axios, * as others from "axios";
import { searchTextData } from "./searchTextData";

function searchSuggestions(responseData, setSearchText, setDebounceText, debounceText, setResultText, setShowSuggestions){
  const responseDataCopy = responseData.map((a, idx) => {
    return <div key={idx}  className="suggestionItems"  onClick={() => {setDebounceText(a); setSearchText(a);  setResultText(a); setShowSuggestions(false); console.log(debounceText)}}  >{a}</div>;
  });

  return responseDataCopy
}


function SearchText({debounceText, setDebounceText, setResultText, searchClick, setSearchClick}) {

  const [searchText, setSearchText] = useState("");
  const [timer, setTimer] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {

    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/auto-complete/",
      params: {
        q: debounceText,
        hl: "en",
        gl: "US",
      },
      headers: {
        "X-RapidAPI-Key": "a09e68c215msh06895de05dfd523p18a81bjsne76a8b651531",
        "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com",
      },
    };

    async function getData() {
      try {
        const response = await axios.request(options);
        const responseData = response.data.results;
        setSuggestions(searchSuggestions(responseData, setSearchText, setDebounceText, debounceText, setResultText, setShowSuggestions));
      } catch (error) {
        const responseData = searchTextData
        setSuggestions(searchSuggestions(responseData, setSearchText, setDebounceText, debounceText, setResultText, setShowSuggestions));
      }
    }

    getData();
  }, [debounceText]);


  useEffect(()=>{
    setDebounceText(searchText);
    setSearchClick(false);
  }, [searchClick])

  function debounce(func, timeout = 300){
    clearTimeout(timer);
    setShowSuggestions(true)
    setTimer( setTimeout(() => { func.apply(this); }, timeout));
  }

  function setText(e){
    setSearchText(e.target.value.toString())
    setShowSuggestions(true);
    if(e.target.value.toString()<1) setShowSuggestions(false)
    debounce(()=>setDebounceText(e.target.value.toString()));
  }

  return (
    <div className="searchText">
      <input
        placeholder="Search"
        value={searchText}
        onChange={setText}
        onke
        type="text"
      ></input>

     { showSuggestions &&  <div>{suggestions}</div>}
    </div>
  );
}

export default SearchText;
