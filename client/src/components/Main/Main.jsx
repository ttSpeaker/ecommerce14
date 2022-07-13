import NavBar from "../Navbar/Navbar";
import Productos from "../Productos/Productos";
import Admin from "../Admin/Admin";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Login from "../Login/Login";
import RegisterContainer from "../Register/RegisterContainer";
import { useState } from "react";

const Main = () => {
  const getIsLoggedIn = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      return true;
    }
    return false;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());

  const logOut = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };
  return (
    <Flex
      bg={"gray.600"}
      height={"100vh"}
      width={"100vw"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <NavBar isLoggedIn={isLoggedIn} logOut={logOut} />
      <Routes>
        <Route path="productos" element={<Productos />} />

        <Route path="admin" element={<Admin isLoggedIn={isLoggedIn} />} />

        <Route
          path="login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />

        <Route path="register" element={<RegisterContainer />} />
      </Routes>
      <Footer />
    </Flex>
  );
};

export default Main;
