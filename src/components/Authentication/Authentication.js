import './Authentication.css'
import background from '../../assets/images/background.jpg'

import logo from '../../assets/images/logo.png'

import { signInWithGoogle } from '../../config/firebase-config';

export default function Authentication() {

    return (
        <div className="Authentication">

            <img className="background" src={background} alt="background"/>
            <div className="darkBackdrop"></div>

            <form className="Authentication-main-form">
                <img src={logo} className="Authentication-logo" alt="logo" />
                
                <div >
                    <input type="button" value="SIGN IN With Google" onClick={signInWithGoogle} />
                </div>
            </form>

        </div>
    )
}