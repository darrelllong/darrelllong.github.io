/* React and hooks */
import React from "react";
/* Context provider */
import { ContextProvider } from "./ContextProvider";
/* Components */
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Main />
        <Footer />
      </ContextProvider>
    </>
  );
}
