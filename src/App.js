import "./App.css";
import SearchNav from "./SearchNav";
import LibraryNav from "./LibraryNav";
import SuggestionNav from "./SuggestionNav";
import VideoBox from "./VideoBox";
import { useEffect, useState } from "react";

function App() {

  const[debounceText, setDebounceText] = useState('');
  const[resultText, setResultText] = useState('Mario');
  const[searchClick, setSearchClick] = useState(false);

  return (
    <div className="sustube">
      <SearchNav debounceText={debounceText} setDebounceText={setDebounceText} setResultText={setResultText} searchClick={searchClick} setSearchClick={setSearchClick}  />
      <LibraryNav />
      <SuggestionNav />
      <VideoBox resultText={resultText} setResultText={setResultText} />
    </div>
  );
}

export default App;
