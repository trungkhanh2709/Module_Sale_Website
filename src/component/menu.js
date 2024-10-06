import '../style/menu.css'
export function Menu(){
    return(
        <div>
            <nav id="menu-header">
                <ul  id="menu-ul-header">
                    <li className="menu-li-header"><a href='' className='menu-a-header'>Home</a></li>
                    <li className="menu-li-header"><a href='' className='menu-a-header'>Product</a></li>
                    <li className="menu-li-header"><a href='' className='menu-a-header'>Contact</a></li>
                    <li className="menu-li-header"><a href='' className='menu-a-header'>About us</a></li>
                </ul>
            </nav>
        </div>
    )
}