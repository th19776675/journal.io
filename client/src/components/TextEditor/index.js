import Toggle from "../Toggle";
import { useEffect, useState } from "react";
import Leader from "../Leader";
import "./text-editor.css"


const TextEditor = ({textState, textHandler, placeholder}) => {
  const [plainSlider, setPlainSlider] = useState(false)
  
  const sliderClickHandler = () => {
    if (plainSlider === false) {
      setPlainSlider(true)
    } else {
      setPlainSlider(false)
    }
  }
  
  if(!plainSlider) {
    return(
      <>
        <div className="editor-wrapper">
          <Leader>
          <p>Toggle Plain/Rich Editor</p>
          <Toggle checked={plainSlider} onClick={sliderClickHandler} />
          </Leader>
          <textarea name="plain" value={textState} onChange={textHandler} className="editor-area" placeholder={placeholder}></textarea>
        </div>
        
      </>
    )
  } 
  return(
    <>
    <Leader>
    <p>Toggle Plain/Rich Editor</p>
    <Toggle checked={plainSlider} onClick={sliderClickHandler} />

    </Leader>
    
  </>
  )
}

export default TextEditor;