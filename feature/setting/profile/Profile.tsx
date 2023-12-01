"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  SaveButton,
  ProfileContent,
  ProfileItemContainer,
  ProfileItems,
  ProfileLabel,
  ProfileTextHeader,
  ProfileWrapper,
} from "./styles";
import { useState, useEffect } from "react";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [name, setName] = useState<string>("Sappe");
  const [email, setEmail] = useState<string>("SappeEmail@gmail.com");
  const [birthdate, setBirthdate] = useState<string>(getTodayDate());
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const [savedValue, setSavedValue] = useState({
    savedName: name,
    savedEmail: email,
    savedBirthdate: birthdate,
  });

  useEffect(() => {
    // Compare changes to the initial values
    if (
      name !== savedValue.savedName ||
      email !== savedValue.savedEmail ||
      birthdate !== savedValue.savedBirthdate
    ) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [name, email, birthdate, savedValue]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  const handleSave = () => {
    setSavedValue({
      savedName: name,
      savedEmail: email,
      savedBirthdate: birthdate,
    });
    setIsEdited(false);
  };

  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");

  const profileLists = [
    {
      label: "Name",
      inputFunction: handleNameChange,
      defaultValue: name,
      type: "text",
    },
    {
      label: "Email",
      inputFunction: handleEmailChange,
      defaultValue: email,
      type: "text",
    },
    {
      label: "Birth Date",
      inputFunction: handleBirthdateChange,
      defaultValue: birthdate,
      type: "date",
    },
  ];

  return (
    <ProfileWrapper>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography fontSize={"24px"} fontFamily={"700"}>
          PROFILE
        </Typography>
      </Box>
      <ProfileTextHeader display={"flex"} justifyContent={"center"}>
        <Typography fontSize={"24px"} fontFamily={"700"}>
          User Information
        </Typography>
      </ProfileTextHeader>
      <ProfileItemContainer>
        <ProfileItems>
          <ProfileLabel color={"secondary.main"}>Account ID</ProfileLabel>
          <Typography
            fontSize={small ? "16px" : medium ? "18px" : "20px"}
            fontWeight={"300"}
          >
            217312893
          </Typography>
        </ProfileItems>
        {profileLists.map((profile, index) => (
          <ProfileItems key={index}>
            <ProfileLabel color={"secondary.main"}>
              {profile.label}
            </ProfileLabel>
            <ProfileContent
              type={profile.type}
              onInput={profile.inputFunction}
              defaultValue={profile.defaultValue}
            />
          </ProfileItems>
        ))}
      </ProfileItemContainer>
      <Box display={"flex"} justifyContent={"center"}>
        <SaveButton onClick={handleSave} disabled={!isEdited} size="large">
          Save
        </SaveButton>
      </Box>
    </ProfileWrapper>
  );
};
