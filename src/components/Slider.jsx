import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = ({ images }) => {
  const [item, setItem] = useState(images)
  const [curIndex, setCurIndex] = useState(0);

  const next = () => {
    setCurIndex((oldIndex) => {
      const ret = (oldIndex + 1) % item.length;
      return ret;
    })

  }

  const prev = () => {
    setCurIndex((oldIndex) => {
      const ret = (oldIndex - 1 + item.length) % item.length;
      return ret;
    })

  }
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000)
    return () => clearInterval(interval);
  }, [curIndex])
  */

  return <div className="relative w-[40vw] h-96">
    {
      item.map((image, index) => {

        return <article className='absolute top-0 left-0 ' style={{ transform: `translateX(${100 * [index - curIndex]}%)`, opacity: curIndex === index ? 1 : 0, visibility: curIndex === index ? 'visible' : 'hidden' }} key={index} >
          <img src={image} alt="" className="w-[40vw] h-96 rounded-md" />
        </article>
      })
    }
    <button type="button" className="btn btn-primary btn-circle absolute top-[20vh] left-0" onClick={() => prev()}><FaChevronLeft /></button>
    <button type="button" className="btn btn-primary btn-circle absolute top-[20vh] right-0" onClick={() => next()}><FaChevronRight /></button>
  </div>
}

export default Slider
