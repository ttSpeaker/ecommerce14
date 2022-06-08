import NavBar from "../Navbar/Navbar";
import Productos from "../Productos/Productos";
import { Routes, Route} from "react-router-dom";
const Main = () =>{
    return(
        <main>
            <NavBar/>
            <Routes>
                <Route path="productos" element={<Productos />} />
            </Routes>
        </main>
        
    )
}

export default Main