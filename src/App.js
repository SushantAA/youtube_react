import './App.css';
import SearchNav from './SearchNav';
import LibraryNav from './LibraryNav';
import SuggestionNav from './SuggestionNav';
import VideoBox from './VideoBox';

function App() {
  return (
    <div className="sustube">
      <SearchNav/>
      <LibraryNav/>
      <SuggestionNav/>
      <VideoBox/>
    </div>
  );
}

export default App;
