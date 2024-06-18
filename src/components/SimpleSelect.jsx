import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";


const SimpleSelect = ({ size, data, defaultValue, name, index }) => {
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(defaultValue ?? data[0])
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch();



  const handleClick = (i) => {
    setValue(i)
    setToggle(false)
  }

  window.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id && toggle || id === 'tag') {
      setToggle(false)
    }
  })



  return <article className={`${size ?? 'w-56'} relative`} >
    <div className="flex justify-between border-[1px] rounded-md p-2" data-id="select" onClick={() => setToggle(true)} >
      <input value={value} onChange={() => setInputValue(value)} className="outline-none w-full capitalize text-gray-700  p-2" name={name} data-id="select" />
      <button type="button" className="text-gray-700" data-id="select" ><AiFillCaretDown data-id="select" /></button>
    </div>
    <div className={`flex flex-col absolute -top-1/2 ${size} mt-2 border-[1px] overflow-auto no-scrollbar h-36 rounded-md ${toggle ? 'flex' : 'hidden'}`} data-id="select">
      {
        data.map((i) => {
          return <div key={i} onClick={() => handleClick(i)} className={`flex flex-col capitalize hover:bg-slate-100 text-gray-700 p-2 ${size}`} >
            <p >{i}</p>
          </div>
        })
      }
    </div>
  </article >

}
export default SimpleSelect;