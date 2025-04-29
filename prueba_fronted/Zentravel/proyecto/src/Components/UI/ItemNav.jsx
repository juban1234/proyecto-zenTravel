
import { NavLink } from 'react-router-dom'

export const ItemNav = ({route,StyleLi,content}) => {
  return (
    <>
        <li className={StyleLi}>
            <NavLink  to={route}> {content} </NavLink>
        </li>
    </>
  )
}
