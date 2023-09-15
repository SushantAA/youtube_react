function Suggestion({ title }) {
  return <div className="suggestion">{title}</div>;
}

function getDummySuggestions() {
  const suggestionList = [
    "Slamdunk",
    "One pice",
    "Dragon ball",
    "Fullmetal",
    "Attack on Titans",
    "Code Geass",
    "Psyco Pass",
  ];

  let suggestionElementList = suggestionList.map((a) => (
    <Suggestion title={a} />
  ));

  return suggestionElementList;
}

function SuggestionNav() {
  return (
    <div className="suggestionNav">
      {getDummySuggestions()}
      {getDummySuggestions()}
    </div>
  );
}

export default SuggestionNav;
