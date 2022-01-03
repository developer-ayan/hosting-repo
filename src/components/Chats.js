import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { SmileFilled, FacebookFilled, InstagramFilled, LinkedinFilled, GithubFilled } from '@ant-design/icons';

import { useAuth } from "../contexts/AuthContext";


export default function Chats() {
    const didMountRef = useRef(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const history = useHistory()


    async function handleLogout() {
        await auth.signOut();

        history.push("/");
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
        }
        if (!user || user === null) {
            history.push("/")

            return
        }

        axios.get(
            'https://api.chatengine.io/users/me/',
            {
                headers: {
                    "project-id": 'fee506ec-9145-4ce8-88fb-8133306a760d',
                    "user-name": user.email,
                    "user-secret": user.uid
                }
            }

        )
            .then(() => {
                setLoading(false);

            })
            .catch(e => {
                let formdata = new FormData()
                formdata.append("email", user.email)
                formdata.append("username", user.email)
                formdata.append("secret", user.uid)

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append("avatar", avatar, avatar.name)

                        axios.post(
                            'https://api.chatengine.io/users/',
                            formdata,
                            { headers: { "private-key": "da5ad2a0-7e98-4b0a-a025-e7cdf6fad6a5" } }
                        )

                            .then(() => setLoading(false))
                            .catch(e => console.log("e", e.response))
                    })
            })

    }, [user, history]);

    if (!user || loading) return <div />

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Group Chats
                </div>

                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>

            </div>


            <ChatEngine
                height="calc(90vh - 66px)"
                projectID='fee506ec-9145-4ce8-88fb-8133306a760d'
                userName={user.email}
                userSecret={user.uid}
            />
            <footer>

                <div>
                    <a target='_blank' href="https://www.facebook.com/ayan.ail.98">
                        <button>
                            <FacebookFilled className="facebook" />
                        </button>
                    </a>
                    <a target='_blank' href="https://www.instagram.com/ayan_aley/">
                        <button>
                            <InstagramFilled className="instagram" />
                        </button>
                    </a>

                    <a target='_blank' href="https://www.linkedin.com/in/ayan-ahmed-724b53226/">
                        <button>
                            <LinkedinFilled className="Linkdin" />
                        </button>
                    </a>

                    <a target='_blank' href="https://github.com/Ayanali786?tab=repositories">
                        <button >
                            <GithubFilled className="Github" />
                        </button>
                    </a>
                </div>
                <div>
                    © Developer: Ayan | 2022
                </div>
            </footer>

        </div>
    )
}
