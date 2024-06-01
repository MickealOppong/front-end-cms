
import { useEffect, useState } from "react";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import defImg from '../assets/index.jpeg';

//list for storing category and attributes
let list = [];
let temp = [];

const ListView = ({ data, leftContainerTitle, rightContainerTitle, title, size }) => {

  const [leftSelected, setLeftSelected] = useState(new Array(list.length).fill(false));
  const [rightSelected, setRightSelected] = useState(new Array(data.length).fill(false));
  const [leftArray, setLeftArray] = useState(list);
  const [rightArray, setRightArray] = useState(data);
  const dispatch = useDispatch();

  const insertIntoContainer = (id, index, direction) => {
    handleChange(index, direction)
    const isChecked = true;
    const d = temp.find((t) => t.id === id)
    if (d) {
      d.isChecked = !d.isChecked;
      return;
    }
    temp.push({ id, isChecked })

  }

  //LEFT SHIFT
  const shiftToLeft = () => {
    let indices = [];
    if (rightArray.length === 0) {
      return
    }
    temp = temp.filter((a) => a.isChecked === true)
    if (temp.length === 0) return
    temp.map((item) => {
      rightArray.find((i, index) => {
        if (i.id === item.id) {
          indices.push(index)
        }
      })
    })

    const arr = rightArray.reduce((acc, value, index) => {
      if (indices.includes(index)) {
        acc.push(value);
      }
      return acc;
    }, [...leftArray]);
    setLeftArray(arr)

    const right = rightArray.reduce((acc, value, index) => {
      if (!indices.includes(index)) {
        acc.push(value);
      }
      return acc;
    }, [])

    setRightArray(right)
    temp = [];

  }


  //RIGHT SHIFT

  const shiftToRight = () => {
    let indices = [];

    if (leftArray.length === 0) {
      return
    }
    temp = temp.filter((a) => a.isChecked === true)
    if (temp.length === 0) return
    temp.map((item) => {
      leftArray.map((i, index) => {
        if (i.id === item.id) {
          indices.push(index)
        }
      })
    })

    const arr = leftArray.reduce((acc, value, index) => {
      if (indices.includes(index)) {
        acc.push(value);
      }
      return acc;
    }, [...rightArray]);
    setRightArray(arr)

    const left = leftArray.reduce((acc, value, index) => {
      if (!indices.includes(index)) {
        acc.push(value)
      }
      return acc;
    }, [])
    setLeftArray(left)

    temp = [];

  }


  //update boolean array for each shift

  useEffect(() => {
    setRightSelected(() => {
      return new Array(rightArray.length).fill(false)
    })

    setLeftSelected(() => {
      return new Array(leftArray.length).fill(false)
    })
  }, [leftArray, rightArray])

  // update state 
  useEffect(() => {
    if (leftArray.length > 0) {
      // dispatch(add({ title, list: leftArray }))
    }
  }, [leftArray])


  const handleChange = (index, direction) => {
    if (direction === 'right') {
      const newArr = rightSelected.map((checked, i) => {
        if (index === i) {
          checked = !checked
        }
        return checked;
      })
      setRightSelected(newArr)
      return;
    }
    const newArr = leftSelected.map((checked, i) => {
      if (index === i) {
        checked = !checked
      }
      return checked;
    })
    setLeftSelected(newArr)

  }



  const shiftAllToLeft = () => {
    if (rightArray.length === 0) {
      return
    }
    if (leftArray.length > 0) {
      const arr = [...leftArray, ...rightArray];
      setLeftArray(arr)
      setRightArray(() => {
        return []
      })
      return;
    }
    setLeftArray(rightArray)
    setRightArray(() => {
      return []
    })

  }



  const shiftAllToRight = () => {
    if (leftArray.length === 0) {
      return
    }
    if (rightArray.length > 0) {
      const arr = [...rightArray, ...leftArray];
      setRightArray(arr)
      setLeftArray(() => {
        return []
      })
      return;
    }
    setRightArray(leftArray)
    setLeftArray(() => {
      return []
    })
  }

  return <div className="flex flex-col gap-x-8 items-center justify-center">
    <div className="flex justify-evenly items-center">
      <div >
        <h2>{leftContainerTitle}</h2>
      </div>
      <div >
        <h2>{rightContainerTitle}</h2>
      </div>
    </div>
    <div className="flex gap-x-4">


      {/** LEFT CONTAINER */}

      <div className={`overflow-y-auto no-scrollbar border-2 shadow-xl text-gray-500 bg-white pt-4 rounded-md ${size}`}>
        {
          leftArray.map((a, index) => {
            const { id, name, img } = a;
            return <ul key={id} className="">
              <li onClick={() => insertIntoContainer(id, index, 'left')} className="flex items-center gap-x-2 capitalize hover:bg-slate-100 p-2 ">
                <img src={img || defImg} className={`w-8 h-8 rounded-full ${leftSelected[index] ? 'border-2 border-cyan-500' : ''}`} />
                <span>{name}</span>
              </li>
            </ul>
          })
        }
      </div>

      <div className="flex flex-col justify-center gap-y-2">
        <button className="border-2 border-sky-300  rounded-md p-2 hover:bg-slate-200" onClick={() => shiftAllToLeft()}><HiOutlineChevronDoubleLeft /></button>
        <button className="border-2 border-sky-300 rounded-md p-2 hover:bg-slate-200" onClick={() => shiftToLeft()}><MdKeyboardArrowLeft className="text-2xl" /></button>
        <button className="border-2 border-sky-300 rounded-md p-2 hover:bg-slate-200" onClick={() => shiftToRight()}><MdKeyboardArrowRight className="text-2xl" /></button>
        <button className="border-2 border-sky-300 rounded-md p-2 hover:bg-slate-200" onClick={() => shiftAllToRight()}><HiOutlineChevronDoubleRight /></button>
      </div>
      {/** RIGHT CONTAINER */}


      <div className={`overflow-y-auto no-scrollbar border-2 shadow-xl text-gray-500 bg-white pt-4 rounded-md ${size}`}>
        {
          rightArray.map((a, index) => {
            const { id, name, img } = a;
            return <ul key={id} >
              <li onClick={() => insertIntoContainer(id, index, 'right')} className="flex items-center gap-x-2 capitalize hover:bg-slate-100 p-2 ">
                < img src={img || defImg} className={`w-6 h-6 rounded-full ${rightSelected[index] ? 'border-2 border-cyan-500' : ''}`} />
                <span>{name}</span>
              </li>
            </ul>
          })
        }
      </div>
    </div>
  </div>
}
export default ListView