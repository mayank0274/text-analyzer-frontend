"use client";
import React, { useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import FileDragDrop from "@/components/FileDragDrop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { analyzeText, uploadFile } from "@/http/api";
import { setAnalysisResult } from "@/store/features/analysis/analysisSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LOADER_IMG from "../../icons/loader.gif";
import IsAuthenticated from "@/hooks/IsAuthenticated";

type Props = {};

const Analyze = (props: Props) => {
  const [prompt, setPrompt] = useState("");
  const { token } = useAppSelector((state) => state.user);
  const [isAnalyzing, setIsAnalyzing] = useState({
    loading: false,
    isFile: false,
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  // analyze from text
  const analyzeFromText = async () => {
    if (prompt === "") {
      toast({
        description: "prompt cannot be empty",
        position: "top",
        isClosable: true,
        duration: 1000,
        status: "error",
      });
      return;
    }

    setIsAnalyzing({
      loading: true,
      isFile: false,
    });
    try {
      const headers = {
        Authorization: token,
      };

      const result = await analyzeText(headers, { userPrompt: prompt });
      if (result.data.response) {
        dispatch(setAnalysisResult({ result: result.data.response }));
        router.push("analysis-result");
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "some error occured",
        position: "top",
        isClosable: true,
        duration: 1000,
        status: "error",
      });
    } finally {
      setIsAnalyzing({
        loading: false,
        isFile: false,
      });
    }
  };

  // handle file upload
  const analyzeFromFile = async (file: any) => {
    setIsAnalyzing({
      loading: true,
      isFile: true,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      const headers = {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      };
      const result = await uploadFile(headers, formData);
      if (result.data.response) {
        dispatch(setAnalysisResult({ result: result.data.response }));
        router.push("/analysis-result");
      }
    } catch (error) {
      toast({
        description: "some error occured",
        position: "top",
        isClosable: true,
        duration: 1000,
        status: "error",
      });
    } finally {
      setIsAnalyzing({
        loading: false,
        isFile: false,
      });
    }
  };

  return (
    <IsAuthenticated>
      <Box
        width={{ base: "95%", sm: "95%", md: "60%", lg: "50%" }}
        display={"flex"}
        flexDir={"column"}
        gap={10}
        alignItems={"center"}
      >
        <Text
          fontSize={"22px"}
          textAlign={{ base: "center", sm: "center", md: "justify" }}
        >
          The best tool to summarize documents and create reports
        </Text>

        <Box
          width={{ base: "95%", sm: "95%", md: "70%", lg: "70%" }}
          position={"relative"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"1px solid #fff"}
          borderRadius={10}
        >
          <Box
            width={"100%"}
            position={"relative"}
            visibility={
              isAnalyzing.loading && isAnalyzing.isFile ? "hidden" : "visible"
            }
          >
            <FileDragDrop handleFile={analyzeFromFile} />
          </Box>
          {isAnalyzing.loading && isAnalyzing.isFile && (
            <Box
              background={"whitesmoke"}
              width={"98%"}
              minH={"190px"}
              position={"absolute"}
              border={"1px solid #fff"}
              // padding={"10px"}
              borderRadius={10}
              opacity={"0.3"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
            >
              <Image
                src={LOADER_IMG}
                width={70}
                height={70}
                alt="parsing file"
              />
              <Text color={"#000"} fontWeight={"semibold"} fontSize={"20px"}>
                Analyzing and parsing file...
              </Text>
            </Box>
          )}
        </Box>

        <Box position="relative" width={"100%"}>
          <Divider />
          <AbsoluteCenter bg={"#1A202C"} px="4">
            OR
          </AbsoluteCenter>
        </Box>

        <Box width={{ base: "95%", sm: "95%", md: "70%", lg: "70%" }}>
          <Textarea
            placeholder="Enter text manually"
            width={"100%"}
            rows={8}
            value={prompt}
            onChange={handleChange}
          />
          <Button
            width={"100%"}
            colorScheme="blue"
            my={3}
            isLoading={isAnalyzing.loading && !isAnalyzing.isFile}
            onClick={analyzeFromText}
          >
            Analyze
          </Button>
        </Box>
      </Box>
    </IsAuthenticated>
  );
};

export default Analyze;
