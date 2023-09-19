import { useDeferredValue, useEffect, useState } from "react";
import axios, * as others from "axios";

function SearchText() {
  const [searchText, setSearchText] = useState("");
  const [deffText, setDeffText] = useState("");
  const [time, setTime] = useState(0);

  const date = new Date();

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/auto-complete/",
      params: {
        q: deffText,
        hl: "en",
        gl: "US",
      },
      headers: {
        "X-RapidAPI-Key": "d0e3eb685dmsh3e4f57bb8137dd0p1b15c4jsne428daa5cd78",
        "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com",
      },
    };

    async function getData() {
      try {
        const response = await axios.request(options);

        const responseData = response.data.results;

        console.log("search suggestions => ", responseData);

        const responseDataCopy = responseData.map((a) => {
          console.log(a);
          return <div>{a}</div>;
        });

        setSuggestions();

        console.log("results => ", responseDataCopy);

        setSuggestions(responseDataCopy);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [deffText]);

  function setDefferedText(e){
    setSearchText(e.target.value.toString())
    
    console.log(searchText, ' <======> ' , deffText)
    
    const currTime = date.getTime();
    console.log(time, currTime, (currTime-time));
    
    if(searchText.length<=1){
      setDeffText('')
      setTime(currTime)
    }

    if((currTime-time) > 400){
      setDeffText(searchText);
      setTime(currTime);  
    }
  }

  return (
    <div className="searchText">
      <input
        placeholder="Search"
        value={searchText}
        // onChange={(e) => setSearchText(e.target.value.toString())}
        onChange={setDefferedText}
        type="text"
      ></input>
      <div>{suggestions}</div>
    </div>
  );
}

export default SearchText;
