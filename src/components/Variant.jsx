
import { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { add } from "../features/data/selectSlice";
//list for storing category and attributes
let list = [];
const Variant = ({ data, title, size }) => {
  const [showList, setShowList] = useState(false)
  const [leftArray, setLeftArray] = useState(list);
  const [rightArray, setRightArray] = useState(data);

  const dispatch = useDispatch();

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
      dispatch(add({ title, list: leftArray }))
    }

  }, [leftArray])


  return <article className={`flex flex-col ${size} mx-auto`} >
    <div className={` overflow-auto no-scrollbar border-[1px] p-2 rounded-md ${size} bg-white cursor-pointer outline-none h-16`} suppressContentEditableWarning contentEditable data-id='tag' onClick={() => setShowList(true)}>
      <ul className="grid grid-cols-4 gap-2"  >
        {
          leftArray.map((a, index) => {
            return <p key={index} onClick={() => shiftToRight(a)} className="flex items-center gap-x-2 capitalize bg-c4  p-2 h-4 text-xs rounded-md text-slate-100">
              <span >{a}</span>
              <span>  <LiaTimesSolid /> </span>
            </p>
          })
        }
      </ul>
    </div>
    {/** RIGHT CONTAINER */}
    <div className={`${showList ? 'flex' : 'hidden'}`} >
      <ul>
        {
          rightArray.length === 0 ? <div className={`px-2 bg-white text-sm mt-2 rounded-md ${size} `}>No more items left</div> : <div className={` bg-slate-50 overflow-y-auto no-scrollbar  h-auto rounded-md ${size}`}>
            {
              rightArray.map((a, index) => {
                return <li key={index} onClick={() => shiftToLeft(a)} className="flex items-center gap-x-2 text-sm capitalize hover:bg-slate-200 px-2" data-id='tag'>{a} </li>
              })
            }
          </div>
        }
      </ul>
    </div>
  </article >
}
export default Variant