import { useState ,useCallback ,useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [intialLength, setLength] = useState(8)
  const [numbersAllowed,setNumbersAllowed] = useState(false)
  const [charactersAllowed,setCharactersAllowed] = useState(false)
  const [password,setPassword] = useState("") //RandomPassword variable

// useRef hook
 const PasswordRef = useRef(null)

//yeh kaam bina useCallback ka bhi hosakta just like below code
// const passwordGenerator = () => {
//   // ...
// };
// use callback optimization ka lya use hota cache , prev mai rakhna ka lya
  const passwordGenerator = useCallback(()=>{
    let RandomPassword = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if (numbersAllowed) str += "012345678910"
    if (charactersAllowed) str += "!@#$%&`(){}"
    for (let i = 1 ; i <= intialLength; i++) {
      let char = Math.floor(Math.random() * str.length);
          RandomPassword += str.charAt(char);
      }
setPassword(RandomPassword)
  },[intialLength,numbersAllowed,charactersAllowed,setPassword]) //setPassword utilzation ka lya nahi denga tab bhi chalega

  //dependency mai kch bhi change hoga woh useEffect  passwordGenerator() ko call karedega
 useEffect(()=>{
  passwordGenerator()
 },[intialLength,numbersAllowed,charactersAllowed,passwordGenerator])

//  CopyPasswordToClipBoard

const CopyPasswordToClipBoard = useCallback(()=>{
  PasswordRef.current?.select()//copy
  window.navigator.clipboard.writeText(password) //focus with blue color
},[password])
  return (
    <>
    {/* main div */}
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3'>Password generator</h1>
    {/* child div */}
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      {/* password input */}
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
   ref={PasswordRef}
        />
        <button
onClick={CopyPasswordToClipBoard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
  {/* child div */}
    <div className='flex text-sm gap-x-2 lala  '>
      <div className='flex items-center gap-x-1'>
        {/* range input */}
        <input 

        type="range"
        min={8}
        max={100}
        value={intialLength}
         className='cursor-pointer w-full'
         onChange={(e) => {setLength(e.target.value)}}

          />
          <label className='w-full'>Length :  {intialLength}</label>
      </div>
        {/* child div */}
      <div className="flex items-center gap-x-1 ">
          {/*Number checkboxinput */}
      <input
          type="checkbox"
   className='w-full'
          id="numberInput"
          onChange={() => {
            setNumbersAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput" className='w-full'>Numbers</label>
      </div>
              {/* child div */}
      <div className="flex items-center  gap-x-1 ">
                  {/*Character checkboxinput */}
          <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id="characterInput"
              className='w-full'
              onChange={() => {
                setCharactersAllowed((prev) => {return !prev}  )
              }}
          />
          <label htmlFor="characterInput" className='w-full'>Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
