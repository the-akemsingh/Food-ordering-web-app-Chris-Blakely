import { useCreateUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = async () => {
    
    const { user } = useAuth0();
    const { createUser } = useCreateUser();
    const Navigate = useNavigate();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({ auth0Id: user.sub, email: user.email });
        }
        Navigate("/");
    }, [user, createUser, Navigate]);

    return (
        <div>Loading..</div>
    )
}
export default AuthCallbackPage;