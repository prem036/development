import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Records from "./pages/Records";
import CardView from "./pages/CardView";
import Navbar from "./components/Navbar";
import VehicleRegistration from "./pages/VehicleRegistration";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/records" element={<Records />} />
        <Route path="/card/:id" element={<CardView />} />
        <Route path="/vehicles" element={<VehicleRegistration />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;