"use client";
import {
  Box,
  Text,
  ButtonGroup,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { logout } from "@/http/api";
import { setUser } from "@/store/features/user/userSlice";
import { useRouter } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const { user, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const logoutUser = async () => {
    try {
      const headers = {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      };
      await logout(headers);
      dispatch(setUser({ token: "" }));
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        description: "some error occured while logout user",
        position: "top",
        isClosable: true,
        duration: 1000,
        status: "error",
      });
    }
  };

  return (
    <Box
      width={{ base: "95%", sm: "95%", md: "60%", lg: "60%" }}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text fontSize={"20px"} fontStyle={"italic"}>
        summarize.ai
      </Text>
      {user.email ? (
        <Box display={"flex"} gap={"5"} alignItems={"center"}>
          <Menu>
            <MenuButton>
              <Avatar
                size={"sm"}
                name={user.name}
                src={user.profilePic}
                mx={2}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
              <Link href={"/history"}>
                <MenuItem>History</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <ButtonGroup>
          <Link href={"/"}>
            {" "}
            <Button fontWeight={"semibold"}>Login</Button>
          </Link>
          <Link href={"/signup"}>
            <Button fontWeight={"semibold"}>Signup</Button>
          </Link>
        </ButtonGroup>
      )}
    </Box>
  );
};

export default Navbar;
