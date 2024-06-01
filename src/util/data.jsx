import { nanoid } from 'nanoid';
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { Fa500Px, FaHome, FaLongArrowAltRight, FaUser } from 'react-icons/fa';
import { FiBox, FiFolderPlus, FiSettings, FiUser, FiUserPlus } from "react-icons/fi";
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdCurrencyExchange } from 'react-icons/md';
import { PiStackDuotone } from "react-icons/pi";

export const menuItem = [
  { id: nanoid(), icon: <FaHome />, text: 'home', url: '/dashboard' },
  { id: nanoid(), icon: <AiOutlineUser />, text: 'users', url: 'profile' },
  { id: nanoid(), icon: <AiOutlineUser />, text: 'products', url: 'products' },
  { id: nanoid(), icon: <FiSettings />, text: 'settings', url: 'settings' },

]

export const userMenu = [
  { id: nanoid(), title: 'my account', url: 'viewUser', icon: <FaUser /> },
  { id: nanoid(), title: 'edit account', url: 'editUser', icon: <Fa500Px /> },
  {
    id: nanoid(), title: 'logout', url: '', icon: <FaLongArrowAltRight />,
  },
]

export const links = [
  {
    id: nanoid(),
    title: 'ecommerce',
    icon: <BsCart2 />,
    links: [
      { id: nanoid(), menu: 'all products', url: 'products' },
      { id: nanoid(), menu: 'add product', url: 'addProduct' },
    ]
  },
  {
    id: nanoid(),
    title: 'category',
    icon: <PiStackDuotone />,
    links: [
      { id: nanoid(), menu: 'all category', url: 'categories' },
      { id: nanoid(), menu: 'add category', url: 'Category' },
    ]
  },
  {
    id: nanoid(),
    title: 'order',
    icon: <FiFolderPlus />,
    links: [
      { id: nanoid(), menu: 'order list', url: 'orders' },
      { id: nanoid(), menu: 'order tracking', url: 'tracking' },
    ]
  },
  {
    id: nanoid(),
    title: 'attributes',
    icon: <FiBox />,
    links: [
      { id: nanoid(), menu: 'all attributes', url: 'attributes' },
      { id: nanoid(), menu: 'add attribute', url: 'attribute' },
    ]
  },
  {
    id: nanoid(),
    title: 'user',
    icon: <FiUser />,
    links: [
      { id: nanoid(), menu: 'all users', url: 'users' },
      { id: nanoid(), menu: 'add new user', url: 'addUser' },
      { id: nanoid(), menu: 'login', url: '' },
      { id: nanoid(), menu: 'sign up', url: 'register' },
    ]
  }, {
    id: nanoid(),
    title: 'roles',
    icon: <FiUserPlus />,
    links: [
      { id: nanoid(), menu: 'all roles', url: 'roles' },
      { id: nanoid(), menu: 'create role', url: 'createRole' },
    ]
  }
]

export const roleData = [
  {
    id: nanoid(),
    model: 'Products',
    counter: 0,
    authorities: [
      { id: nanoid(), text: 'all', access: false },
      { id: nanoid(), text: 'view', access: false },
      { id: nanoid(), text: 'create', access: false },
      { id: nanoid(), text: 'edit', access: false },
      { id: nanoid(), text: 'delete', access: false },
    ]
  },
  {
    id: nanoid(),
    model: 'Orders',
    counter: 0,
    authorities: [
      { id: nanoid(), text: 'all', access: false },
      { id: nanoid(), text: 'view', access: false },
      { id: nanoid(), text: 'create', access: false },
      { id: nanoid(), text: 'edit', access: false },
      { id: nanoid(), text: 'delete', access: false },
    ]
  },
  {
    id: nanoid(),
    model: 'Users',
    counter: 0,
    authorities: [
      { id: nanoid(), text: 'all', access: false },
      { id: nanoid(), text: 'view', access: false },
      { id: nanoid(), text: 'create', access: false },
      { id: nanoid(), text: 'edit', access: false },
      { id: nanoid(), text: 'delete', access: false },
    ]
  },
  {
    id: nanoid(),
    model: 'Categories',
    counter: 0,
    authorities: [
      { id: nanoid(), text: 'all', access: false },
      { id: nanoid(), text: 'view', access: false },
      { id: nanoid(), text: 'create', access: false },
      { id: nanoid(), text: 'edit', access: false },
      { id: nanoid(), text: 'delete', access: false },
    ]
  },
  {
    id: nanoid(),
    model: 'Attributes',
    counter: 0,
    authorities: [
      { id: nanoid(), text: 'all', access: false },
      { id: nanoid(), text: 'view', access: false },
      { id: nanoid(), text: 'create', access: false },
      { id: nanoid(), text: 'edit', access: false },
      { id: nanoid(), text: 'delete', access: false },
    ]
  },
  {
    id: nanoid(),
    model: 'Roles',
    counter: 0,
    authorities: [
      { id: nanoid(), text: 'all', access: false },
      { id: nanoid(), text: 'view', access: false },
      { id: nanoid(), text: 'create', access: false },
      { id: nanoid(), text: 'edit', access: false },
      { id: nanoid(), text: 'delete', access: false },
    ]
  }
]

export const settingsMenu = [
  {
    id: nanoid(),
    title: 'currency',
    icon: <MdCurrencyExchange />,
    links: [
      { id: nanoid(), menu: 'all currencies', url: 'currencies' },
      { id: nanoid(), menu: 'new currency', url: 'currency' },
    ]
  },
]



export const dashboardMenu = [
  {
    id: nanoid(),
    title: 'dashboard',
    icon: <LuLayoutDashboard />,
    links: [
      { id: nanoid(), menu: 'dashboard 1', url: '/' },
      { id: nanoid(), menu: 'dashboard 2', url: '/' },
    ]
  },
]



