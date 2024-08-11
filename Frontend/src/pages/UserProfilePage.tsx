import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useUpdateUser } from "@/api/MyUserApi";

const UserProfilePage = () => {
    const {updateUser,isLoading}=useUpdateUser(); 

    return (
        <UserProfileForm onSave={updateUser} isLoading={isLoading}></UserProfileForm>
    )
}
export default UserProfilePage;