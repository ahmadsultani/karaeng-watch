"use client";

import Cookies from "js-cookie";

import { IUser } from "@/interfaces/user";

import { ProfileWrapper } from "./styles";
import { UserInformation } from "./UserInformation";
import { useMemo } from "react";
import { Divider } from "@mui/material";
import { ProfilePicture } from "./ProfilePicture";
import { EmailInformation } from "./EmailInformation";

export interface ProfileSectionProps {
  user: IUser;
}

export const Profile: React.FC = () => {
  const userCookies = Cookies.get("user");
  const user = useMemo(() => {
    return JSON.parse(userCookies || "{}") as IUser;
  }, [userCookies]);

  return (
    <ProfileWrapper>
      <ProfilePicture user={user} />
      <Divider />
      <EmailInformation user={user} />
      <Divider />
      <UserInformation user={user} />
    </ProfileWrapper>
  );
};

export default Profile;
