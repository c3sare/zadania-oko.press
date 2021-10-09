import {MdNotificationsNone, MdOutlineAccountCircle, MdOutlineSearch} from 'react-icons/md';

const Navbar = ({menuItems, logged, setLogged}) => (
    <header>
        <div className="leftside">
            <div className="logo"></div>
            {menuItems.map(navItem => (
                <a key={navItem.id} href={navItem.link}>
                    {navItem.title}
                </a>
            ))}
        </div>
        <div className="rightside">
            <a href="/" className="icon"><MdOutlineSearch/></a>
            {!logged ?
                <a href="/" onClick={e => {e.preventDefault(); setLogged(true);}} className="btn">Zaloguj się</a>
                :
                <>
                    <a href="/" className="icon"><MdNotificationsNone/></a>
                    <a href="/" className="icon"><MdOutlineAccountCircle/></a>
                </>
            }
        </div>
    </header>
)

export default Navbar;