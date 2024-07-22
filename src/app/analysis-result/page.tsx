"use client";
import React, { useState } from "react";
import { Box, Text, Tag, Button } from "@chakra-ui/react";
import { useAppSelector } from "@/store/hooks";
import SoundIcon from "@/icons/SoundIcon";
import { DownloadIcon } from "@chakra-ui/icons";
import { exportToPdf } from "@/utlis/utlityFn";
import { useRouter } from "next/navigation";
import IsAuthenticated from "@/hooks/IsAuthenticated";

type Props = {};

const AnalysisResult = (props: Props) => {
  const { analysis } = useAppSelector((state) => state.analysis);
  const { sentimentAnalysis, summary, topics, keywords } = analysis;
  const router = useRouter();
  let utterance: SpeechSynthesisUtterance | null = null;
  const [isSpeakingText, setIsSpeakingText] = useState(false);

  const listenAnalysis = (text: string) => {
    if (utterance) {
      speechSynthesis.cancel();
      utterance = null;
      setIsSpeakingText(false);
      return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    setIsSpeakingText(true);
  };

  return (
    <IsAuthenticated>
      <Box
        width={{ base: "95%", sm: "95%", md: "60%", lg: "60%" }}
        display={"flex"}
        flexDir={"column"}
        gap={"15px"}
      >
        {/* {summary} */}
        <Box display={"flex"} flexDir={"column"} gap={"7px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"25px"}>Summary</Text>
            <Box display={"flex"} gap={3}>
              <Button
                margin={0}
                padding={0}
                onClick={() => {
                  listenAnalysis(JSON.stringify(analysis));
                }}
                background={
                  isSpeakingText ? "blue" : "rgba(255, 255, 255, 0.08)"
                }
                title="listen analysis"
              >
                <SoundIcon height="25px" width="25px" />
              </Button>
              <Button
                margin={0}
                padding={0}
                onClick={() => {
                  exportToPdf(analysis);
                }}
                title="download"
              >
                <DownloadIcon />
              </Button>
            </Box>
          </Box>
          <Text fontSize={"16.5px"} fontWeight={"semibold"}>
            {summary === "" ? "Text can't be summarize" : summary}
          </Text>
        </Box>

        {/* {sentimentAnalysis} */}
        <Box display={"flex"} flexDir={"column"} gap={"7px"}>
          <Text fontSize={"25px"}>Sentiment analysis</Text>
          <Text fontSize={"16.5px"} fontWeight={"semibold"}>
            {sentimentAnalysis === ""
              ? "Sentiment analysis can't be generated from given text"
              : sentimentAnalysis}
          </Text>
        </Box>

        {/* {topics} */}
        <Box display={"flex"} flexDir={"column"} gap={"4px"}>
          <Text fontSize={"25px"}>Topics</Text>
          {topics != "" && topics?.split(",").length > 0 ? (
            <Box
              display={"flex"}
              flexDir={"row"}
              gap={"10px"}
              flexWrap={"wrap"}
            >
              {topics?.split(",").map((elem) => {
                return (
                  <Tag maxWidth="max-content" key={elem}>
                    {elem}
                  </Tag>
                );
              })}
            </Box>
          ) : (
            <Text>No topics available</Text>
          )}
        </Box>

        {/* {keyword} */}
        <Box display={"flex"} flexDir={"column"} gap={"4px"}>
          <Text fontSize={"25px"}>Keywords</Text>
          {keywords != "" && keywords?.split(",").length > 0 ? (
            <Box
              display={"flex"}
              flexDir={"row"}
              gap={"10px"}
              flexWrap={"wrap"}
            >
              {keywords?.split(",").map((elem) => {
                return (
                  <Tag maxWidth="max-content" key={elem}>
                    {elem}
                  </Tag>
                );
              })}
            </Box>
          ) : (
            <Text>No keyword found</Text>
          )}
        </Box>
      </Box>
    </IsAuthenticated>
  );
};

export default AnalysisResult;
