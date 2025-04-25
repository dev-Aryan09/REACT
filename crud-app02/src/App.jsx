import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductHome } from "./ProductHome.jsx";
import { Update } from "./components/UpdateInfo/Update.jsx";
import { Create } from "./components/CreateInfo/Create.jsx";
import { Read } from "./components/ReadInfo/Read.jsx";
import { NoPage } from "./components/NoPage.jsx";

function App() {
  return (
    <Router>
      <h5>Element/Component at this place shows on every page</h5>
      <Routes>
        <Route path="/" element={<ProductHome />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/update/:id" element={<Update />}/>
        <Route path="/read/:id" element={<Read />}/>
        <Route path="*" element={<NoPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
