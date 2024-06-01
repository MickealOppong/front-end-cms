import { useState } from "react";
import { useDispatch } from "react-redux";
import { SelectVariant } from ".";
import { removeIndex } from "../features/data/selectSlice";

const AddVariant = ({ data, size }) => {
  const [counter, setCounter] = useState(1)
  const [array, setArray] = useState(Array.from({ length: counter }));
  const dispatch = useDispatch();

  const remove = (i) => {
    // if (counter === 1) return
    let newCounter = counter - 1;
    setCounter(() => newCounter)
    const newArr = array.reduce((acc, value, index) => {
      if (index !== i) {
        acc.push(value)
      }
      return acc;
    }, [])

    setArray((Array.from({ length: newArr.length })))
    dispatch(removeIndex({ i, type: 'attribute' }))
  }


  return <article className="bg-white w-[30vw] flex flex-col py-4 border-2 rounded-md shadow-md" >
    <div className="flex ml-8 font-semibold">
      <h2>Variant</h2>
    </div>

    <div>
      {
        array.map((_, index) => {
          return <div key={index} className={` ${counter === 1 ? 'border-0' : 'border-b-2 border-dotted'}`}>
            <div className="flex flex-col gap-y-4 ml-8 mt-4">
              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-2 capitalize  text-black
                ">
                  <span>option</span>
                  <span>{index + 1}</span>
                </div>
                <button type="button" onClick={() => remove(index)} className="text-c4 text-xs capitalize">remove</button>
              </div>
              <div className="flex justify-center">
                <SelectVariant data={data} size={'w-96 mr-8'} index={index} />
              </div>
            </div>
          </div>
        })
      }
    </div>
    <div className="flex justify-center">
      <button type="button" onClick={() => {
        let newCounter = counter + 1;
        setCounter(() => newCounter)
        setArray(() => Array.from({ length: newCounter }))
      }} className="btn bg-c4 hover:bg-c4  text-slate-100 w-80 mt-2">add another option</button>
    </div>
  </article >
}
export default AddVariant