import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defImg from '../assets/profile.png';
import { toggle } from "../features/sidebar/sidebarSlice";
import { logoutUser } from "../features/user/userSlice";
import { customFetch } from "../util";
import { userMenu } from "../util/data";
import CurrencySelect from "./CurrencySelect";
import SearchInput from "./SearchInput";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const user = useSelector((state) => state.userState.user);
  const { fx, iso } = useSelector((state) => state.selectState.currency);

  //const token = useSelector((state) => state.userState.token);
  //console.log(currency);
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  //const { authority } = user?.authorities[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleForm = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  const handleClick = (title, url) => {

    if (!user) {
      setShowMenu(false)
      return
    }
    if (title === 'my account' || title === 'edit account') {
      navigate(`${url}/${user.id}`)
    } else if (title === 'logout') {
      logout()
      navigate('')
    } else {
      navigate(`/${url}`)
    }

    setShowMenu(false)
  }



  const logout = async () => {
    try {
      const token = localStorage.getItem('jwt')
      const response = await customFetch.delete('/api/auth/logout', {
        params: {
          token
        },

      })
      dispatch(logoutUser())
      navigate(`/landing`)
    } catch (error) {
      console.log(error);
    }
  }



  const getFirstName = (name) => {
    let len = name?.search(" ")
    if (len > 0) {
      return name?.substring(0, len)
    }
    return name;
  }
  return <nav className={` flex py-4 px-8 h-20 items-center  bg-white z-50`}>
    {/** TOGGLE BUTTON */}
    <div className="flex  text-3xl text-c4 font-bold " >
      <button onClick={() => dispatch(toggle())}><FaBarsStaggered /></button>
    </div>
    {/** SEARCH INPUT */}
    <div className='hidden lg:flex w-3/4 mx-10'>
      <SearchInput size='w-[50%]' />
    </div>

    {/** CURRENCY */}
    <form className="flex w-24 mx-16" onSubmit={handleForm}>
      <CurrencySelect data={['USD', 'GBP', 'PLN', 'EUR', 'GHS']} size={'w-24'} name={'currency'} defaultValue={iso} />
    </form>
    {/** USER INFO */}
    <div className="relative lg:pr-24">
      <div className="capitalize flex  items-center gap-x-2">
        <img src={user?.image || defImg} className="w-10 h-10 rounded-full" />
        <div onClick={() => setShowMenu(!showMenu)} className="flex  items-center text-sky-500">
          <h2 className="text-sm font-bold">{getFirstName(user?.fullname)}</h2>
          <button><FiChevronDown /></button>
        </div>
      </div>
      {/** DROP MENU */}
      <div className={`flex flex-col gap-y-4 p-2 border-[1px]  bg-white absolute  top-16 left-[0px] w-36 rounded-md `} style={{ display: showMenu ? 'flex' : 'none' }} data-id='drop-menu'>
        <h2 className="text-xs font-semibold">Welcome!</h2>
        {userMenu.map((item) => {
          const { id, title, url, icon } = item;
          return <div key={id} className="px-2 hover:text-sky-700 hover:font-semibold capitalize flex items-center cursor-pointer " onClick={() => handleClick(title, url)} >
            <span className="text-xs mr-2 text-gray-500">{icon} </span>
            <span className="text-xs text-gray-700 font-semibold">{title}</span>
          </div>
        })}
      </div>
    </div>

  </nav>


}
export default Navbar;