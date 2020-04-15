import React from "react";
import { Link } from "react-router-dom"
import { useUser } from './UserProvider'
import { signInWithGoogle, signOut} from "../services/firebase"
const Navbar = () => {
    var user = useUser()
    return(
        <div>
            <Link to="/">Discover </Link>
            {(user)?(
                <span>
                    <Link to={`/users/${user.uid}`}>Profile </Link>
                    <Link to="/Projects">Projects </Link>
                    <Link to ="/">
                        <button onClick={()=> {signOut()}}>Sign out</button>
                    </Link>
                </span>
            ):(<button onClick={signInWithGoogle}>Sign in with Google</button>)}
            
        </div>
    )
}

export default Navbar