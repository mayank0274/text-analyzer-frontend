"use client";
import React, { useCallback } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import UploadIcon from "@/icons/UploadIcon";
import { useDropzone } from "react-dropzone";

type Props = {
  handleFile: (file: any) => void;
};

const FileDragDrop = ({ handleFile }: Props) => {
  const toast = useToast();
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".html", ".txt"],
      "application/pdf": [".pdf"],
      "application/doc": [".doc", ".docx"],
    },
  });
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"200px"}
      padding={"15px"}
      gap={4}
      cursor={"pointer"}
      width="100%"
      position={"relative"}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <UploadIcon width="50px" height="50px" />
      <Text textAlign={{ base: "center", sm: "center", md: "justify" }}>
        Drop your file here or click here to select file
      </Text>
      <Text textAlign={{ base: "center", sm: "center", md: "justify" }}>
        Supported formats .pdf , .docx , .txt , .html etc.
      </Text>
      {isDragActive && (
        <Box
          background={"whitesmoke"}
          width={"98%"}
          minH={"190px"}
          position={"absolute"}
          border={"1px solid #fff"}
          padding={"10px"}
          borderRadius={10}
          opacity={"0.3"}
        ></Box>
      )}
    </Box>
  );
};

export default FileDragDrop;
