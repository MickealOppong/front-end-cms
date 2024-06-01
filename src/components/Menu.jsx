import { userMenu } from "../util/data";
const Menu = () => {
  return <ul className='flex flex-col' style={{ display: 'absolute', top: '50%' }}>

    {
      userMenu.map((item) => {
        const { id, url, title } = item;
        return <a href={url} key={id}>{title}</a>
      })
    }
  </ul>
}
export default Menu;