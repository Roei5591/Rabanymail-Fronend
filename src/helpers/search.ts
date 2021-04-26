import parse from 'html-react-parser';

const highlightSearchTerm = (text : string ,searchTermRegExp : RegExp | null) => {

  if(!searchTermRegExp) return parse(text);
  const newText = text.replaceAll(searchTermRegExp, "<span style='background-color:rgb(241,196,15)'>$1</span>")
  return(parse(newText));
  
}

export default highlightSearchTerm;