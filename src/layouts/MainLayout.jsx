import './MainLayout.css'
import AfterLogin from './AfterLogin'
import BeforeLogin from './BeforeLogin'

function MainLayout() {
  let loggedInUser = ()=>{
    const user = localStorage.getItem('token');
    return user ? JSON.parse(user) : false;
  }
  return (
    <div className="app-layout">
      {loggedInUser() ? <AfterLogin /> : <BeforeLogin />}
    </div>
  )
}

export default MainLayout
