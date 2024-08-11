import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu"

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <span className="flex space-x-2 items-center">

            {isAuthenticated ? (
                <UsernameMenu />
            ) : (
                <Button className="font-bold text-xl hover:text-orange-500 hover:bg-white" variant="ghost" onClick={
                    () => {
                        loginWithRedirect();
                    }}>Log In</Button>
            )}

        </span>

    )
};
export default MainNav;