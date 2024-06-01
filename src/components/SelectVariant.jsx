import { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { addToList, removeItem } from "../features/data/selectSlice";
let list = [];
const Select = ({ size, data, defaultValue, name, index }) => {
  const attributeList = data.map((a) => a.name)

  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(defaultValue ?? attributeList[0])
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch();

  const sku = data[0]?.productSKU.map((s) => s.skuValue);
  const [showList, setShowList] = useState(false)
  const [leftArray, setLeftArray] = useState(list);
  const [rightArray, setRightArray] = useState(sku);


  const handleClick = (i) => {
    setValue(() => i)
    setToggle(() => false)
    const selected = data.find((a) => a.name == i)
    let sku = selected.productSKU.map((s) => s.skuValue);

    setRightArray(() => sku)
    setLeftArray(() => [])
  }

  window.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id && toggle || id === 'tag') {
      setToggle(false)
    }
  })


  window.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    if (id !== 'tag') {
      setShowList(false)
    }
  })

  //LEFT SHIFT
  const shiftToLeft = (a) => {
    const arr = rightArray.reduce((acc, value) => {
      if (value === a) {
        acc.push(value);
      }
      return acc;
    }, [...leftArray]);
    setLeftArray(arr)

    const right = rightArray.reduce((acc, value) => {
      if (value !== a) {
        acc.push(value);
      }
      return acc;
    }, [])

    setRightArray(right)

  }


  //RIGHT SHIFT

  const shiftToRight = (a) => {

    const arr = leftArray.reduce((acc, value) => {
      if (value === a) {
        acc.push(value);
      }
      return acc;
    }, [...rightArray]);
    setRightArray(arr)

    const left = leftArray.reduce((acc, value) => {
      if (value !== a) {
        acc.push(value)
      }
      return acc;
    }, [])
    setLeftArray(left)

  }



  useEffect(() => {
    if (leftArray.length > 0) {
      dispatch(addToList({ title: value, list: leftArray, index }))
    }

  }, [leftArray])

  return <article className={`${size ?? 'w-56'} relative`} >
    <div className="flex justify-between border-[1px] rounded-md p-2" data-id="select" onClick={() => setToggle(true)} >
      <input value={value} onChange={() => setInputValue(value)} className="outline-none w-[80%] capitalize text-gray-700" name={name} data-id="select" />
      <button type="button" className="text-gray-700" data-id="select" ><AiFillCaretDown data-id="select" /></button>
    </div>
    <div className={`flex flex-col absolute -top-1/2 bg-white ${size} mt-2 border-[1px] overflow-auto no-scrollbar h-36 rounded-md ${toggle ? 'flex' : 'hidden'}`} data-id="select">
      {
        attributeList.map((i, index) => {
          return <div key={index} onClick={() => handleClick(i)} className={`flex flex-col capitalize hover:bg-slate-100 text-gray-700 p-2 w-[40vw]`} >
            <p >{i}</p>
          </div>
        })
      }
    </div>
    {/** LEFT CONTAINER */}
    <div className={`flex flex-col ${size} mx-auto py-4`} >
      <div className={` overflow-auto no-scrollbar border-[1px] p-2 rounded-md ${size} bg-white cursor-pointer outline-none h-16`} suppressContentEditableWarning contentEditable data-id='tag' onClick={() => setShowList(true)}>
        <ul className="flex gap-2"  >
          {
            leftArray.map((a, index) => {
              return <li key={index} onClick={() => {
                shiftToRight(a)
                dispatch(removeItem({ title: value, sku: a }))
              }} className="flex items-center gap-x-2 capitalize bg-c4 p-2 h-4 text-xs rounded-md text-slate-100 w-auto">
                <p>{a}</p>
                <LiaTimesSolid />
              </li>
            })
          }
        </ul>
      </div>
      {/** RIGHT CONTAINER */}
      <div className={`${showList ? 'flex' : 'hidden'}`} >
        <ul>
          {
            rightArray?.length === 0 ? <li className={`px-2 bg-white text-sm mt-2 rounded-md ${size} `}>No more items left</li> : <div className={` bg-slate-50 overflow-y-auto no-scrollbar  h-auto rounded-md ${size}`}>
              {
                rightArray?.map((a, index) => {
                  return <li key={index} onClick={() => {
                    shiftToLeft(a)
                  }} className="flex items-center capitalize gap-x-2 text-sm hover:bg-slate-200 px-2" data-id='tag'>{a} </li>
                })
              }
            </div>
          }
        </ul>
      </div>
    </div>
  </article >

}
export default Select;