"use client";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "";
import {
  Box,
  Input,
  InputRightElement,
  InputGroup,
  FormLabel,
  Heading,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { object, string } from "yup";
import { useAppDispatch } from "@/store/hooks";
import { setToken, setUser } from "@/store/features/user/userSlice";
import { getUserDetails, login, signup } from "@/http/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const Signup: React.FC<Props> = () => {
  // show hide password
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  // hnadle show/hide password
  const handlePwd = (): void => {
    setShowPwd((prev) => {
      return !prev;
    });
  };

  const registerUser = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    setLoading(true);
    try {
      const res = await signup(data);

      toast({
        description: res.data?.message,
        status: "success",
        position: "top",
        duration: 1200,
        isClosable: true,
      });

      router.push("/");
    } catch (error) {
      const err: any = error;

      toast({
        description:
          err.response.data.message || err.message || err.response.data.error,
        status: "error",
        isClosable: true,
        duration: 1500,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = object({
    name: string().required("name is required"),
    email: string()
      .email("invalid email address")
      .required("Email is required"),
    password: string()
      .min(8, "Password must contain minimum 8 characters")
      .required("Password is required"),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      await registerUser({
        name,
        email,
        password,
      });
    },
  });

  return (
    <Box
      width="100%"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      gap={"25px"}
      my={"20px"}
    >
      <Heading textAlign={"center"} fontWeight={"semibold"}>
        Signup to use summarize.ai
      </Heading>
      <form
        style={{
          width: "30%",
        }}
        onSubmit={handleSubmit}
      >
        <Box>
          <FormLabel>Name</FormLabel>
          <Input
            as="input"
            type="text"
            id="name"
            name="name"
            border={"1px solid"}
            value={values.name}
            onChange={handleChange}
            isInvalid={errors.name && touched.name ? true : false}
          />

          {errors.name && (
            <Text color="orangered" fontSize={"15px"} mt={"5px"}>
              {errors.name}
            </Text>
          )}
        </Box>

        <Box my={"15px"}>
          <FormLabel>Email</FormLabel>
          <Input
            as="input"
            type="email"
            id="email"
            name="email"
            border={"1px solid"}
            value={values.email}
            onChange={handleChange}
            isInvalid={errors.email && touched.email ? true : false}
          />

          {errors.email && (
            <Text color="orangered" fontSize={"15px"} mt={"5px"}>
              {errors.email}
            </Text>
          )}
        </Box>

        <Box my={"15px"}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              as="input"
              type={showPwd ? "text" : "password"}
              id="password"
              name="password"
              border={"1px solid"}
              value={values.password}
              onChange={handleChange}
              isInvalid={errors.password ? true : false}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handlePwd}>
                {showPwd ? "hide" : "show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          {errors.password && (
            <Text color="orangered" fontSize={"15px"} mt={"5px"}>
              {errors.password}
            </Text>
          )}
          <Button
            colorScheme="teal"
            my={"20px"}
            width={"100%"}
            type="submit"
            isLoading={isLoading}
          >
            Signup
          </Button>

          <Text textAlign={"center"}>
            Already have account ?{" "}
            <Text
              as={"span"}
              color={"highlight"}
              textDecoration={"underline"}
              textUnderlineOffset={2}
            >
              <Link href={"/"}>click here to login</Link>
            </Text>
          </Text>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
