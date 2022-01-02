import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";
import { auth } from "../firebase";

import firebase from "firebase/app";


const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Your Chat App!</h2>

                <button
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" />
                    </div>
                    <div>
                        <p>Sign In with Google</p>
                    </div>
                </button>

            </div>

        </div>
    );
}

export default Login;