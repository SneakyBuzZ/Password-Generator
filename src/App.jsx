import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

  const [password,setPassword] = useState("");
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [specialCharacterAllowed,setSpecialCharacterAllowed] = useState(false);

  const copyText = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let samplePassword = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@#$%^&*()[]{}?/._-<>";

    (numberAllowed) ? characters += numbers : characters=characters;
    (specialCharacterAllowed) ? characters += specialCharacters : characters = characters;

    for (let i = 0; i < length; i++) {
      let index = Math.floor ( Math.random() * characters.length )
      samplePassword += characters.charAt(index);
    }

    setPassword(samplePassword);

  },[length,numberAllowed,specialCharacterAllowed])

  const copyTextToClipBoard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,specialCharacterAllowed,setPassword])

  return (
    <>
     <div className="bigcontainer">
      <p>Password Generator</p>
      <div className="uppercontainer">

        <input type="text"
               placeholder='password'
               value={password}
               readOnly/> 

        <button onClick={copyTextToClipBoard}>Copy</button>

      </div>

      <div className="lowercontainer">

        <input type="range" 
               id="len"
               min={8}
               max={16}
               value={length}
               onChange={(e)=> setLength(e.target.value)}/> 
        <label>Length:{length}</label>

        <input type="checkbox" 
               id="num"
               defaultChecked={numberAllowed}
               onChange={()=> setNumberAllowed((prev)=>!prev)}/>
        <label>Numbers</label>

        <input type="checkbox"
               id="charac"
               defaultChecked={specialCharacterAllowed}
               onChange={()=> setSpecialCharacterAllowed((prev)=> !prev)}/>
        <label>Characters</label>

      </div>

     </div>
    </>
  )
}

export default App
