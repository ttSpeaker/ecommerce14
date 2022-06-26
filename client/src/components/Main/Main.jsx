import NavBar from "../Navbar/Navbar";
import Productos from "../Productos/Productos";
import Footer from "../Footer/Footer";
import { Routes, Route} from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Login from "../Login/Login";
import Register from "../Register/Register";
const Main = () =>{
    return(
        <Flex bg={"gray.600"} height={"100vh"} width={"100vw"} flexDirection={"column"} justifyContent={"space-between"}>
            <NavBar/>
             <Routes>
                <Route path="productos" element={<Productos />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register/>} />
            </Routes>
            <Footer/>
        </Flex>
    )
}

export default Main