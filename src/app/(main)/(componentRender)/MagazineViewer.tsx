import { useTheme } from "@/src/hooks/ThemeContext";
import clsx from "clsx";
import React, { useEffect, useState, useRef } from "react";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

const MagazineViewer = () => {
  const pdfRef = useRef(null);
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      className={clsx("flex-1", isDarkMode ? "bg-black" : "bg-white")}
    >
      <Pdf
        ref={pdfRef}
        source={require("@/src/assets/pdf/magazine.pdf")}
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? "#000" : "#fff",
        }}
        onPageChanged={(page) => console.log(page)}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        trustAllCerts={false}
        horizontal
        enablePaging={true}
        maxScale={4}
        // scale={2}
        // minScale={2}
        // fitPolicy={0}
        spacing={0}
      />
    </SafeAreaView>
  );
};

export default MagazineViewer;
