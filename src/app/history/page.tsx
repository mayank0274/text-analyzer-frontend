"use client";
import { getHistory } from "@/http/api";
import { useAppSelector } from "@/store/hooks";
import { exportToPdf } from "@/utlis/utlityFn";
import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Button, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Analysis {
  text: string;
  analysis_result: string;
  user: string;
}

type Props = {};

const History = (props: Props) => {
  const [history, setHistory] = useState([]);
  const { token } = useAppSelector((state) => state.user);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function getUserHistory() {
    try {
      setIsLoading(true);
      const headers = {
        Authorization: token,
      };
      const res = await getHistory(headers);

      if (res.data.history) {
        setHistory(res.data.history);
      }
    } catch (err: any) {
      toast({
        description:
          err.response.data.message || err.message || err.response.data.error,
        status: "error",
        isClosable: true,
        duration: 1500,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserHistory();
  }, []);

  return (
    <Box
      width={{ base: "95%", sm: "95%", md: "60%", lg: "60%" }}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
    >
      <Text fontSize={"23px"}>History</Text>
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"15px"}
        alignItems={"center"}
      >
        {history.length === 0 ? (
          isLoading ? (
            <Spinner size={"md"} m={10} />
          ) : (
            <Text alignSelf={"flex-start"}>No history found</Text>
          )
        ) : (
          history.map((history: Analysis) => {
            return (
              <Box
                width={"100%"}
                backgroundColor={"#112240"}
                padding={"10px"}
                borderRadius={10}
                display={"flex"}
                flexDir={"column"}
                gap={"5px"}
                key={history.user}
              >
                <Text>{history.text}...</Text>
                <Button
                  onClick={() => {
                    exportToPdf(JSON.parse(history.analysis_result));
                  }}
                  title="download"
                  fontWeight={"semibold"}
                  width={"max-content"}
                >
                  <DownloadIcon mr={3} />
                  Download analysis report
                </Button>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default History;
