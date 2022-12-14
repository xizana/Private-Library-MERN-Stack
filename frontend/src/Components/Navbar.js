import { Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import image2 from "../images/image2.svg"


export default function Navbar() {

    const { user } = useAuthContext()

    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link className="logo" to="/" >
                    <h1>Private Library</h1>
                </Link>

                {user && (
                    <img className="navImage" src={image2} alt="" />
                )}

                <nav>

                    {!user && (
                        <div className="leaveRecomendation">
                            <Link to="/recomendations">
                                Recomendations
                            </Link>
                        </div>
                    )}
                    {user && (
                        <div>
                            <span>Welcome!<span className="userEmail">{user.email}</span></span>
                            <button className="logout" onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link className="login" to="/login">
                                Log in
                            </Link>
                            <Link className="signup" to="/signup">
                                Sign up
                            </Link>
                        </div>
                    )}

                </nav>

            </div>
        </header>

    )
}
