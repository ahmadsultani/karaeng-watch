"use client";

import Cookies from "js-cookie";

import { IUser } from "@/interfaces/user";

import { ProfileWrapper } from "./styles";
import { UserInformation } from "./UserInformation";
import { useEffect, useState } from "react";
import { CircularProgress, Divider } from "@mui/material";
import { ProfilePicture } from "./ProfilePicture";
import { EmailInformation } from "./EmailInformation";
import { EmptyWrapper } from "@/components/Wrapper/styles";

export interface ProfileSectionProps {
  user: IUser;
}

export const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const userCookies = Cookies.get("user");
    userCookies && setUser(JSON.parse(userCookies) as IUser);
  }, []);

  return (
    <ProfileWrapper>
      {!user ? (
        <EmptyWrapper>
          <CircularProgress />
        </EmptyWrapper>
      ) : (
        <>
          <ProfilePicture user={user} />
          <Divider />
          <EmailInformation user={user} />
          <Divider />
          <UserInformation user={user} />
        </>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
