import {AuthButton} from "../AuthButton";

const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>

// Unneeded for sign on stuff now, could maybe have a user's claimed items or see their submitted lost items here
            <AuthButton />
        </div>
    );
};

export default Profile;