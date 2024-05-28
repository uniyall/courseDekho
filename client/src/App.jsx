import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Entry from "./pages/Entry";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import { AuthProvider } from "./hooks/useAuth";
import AddCourse from "./pages/AddCourse";
import Home from "./pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Entry />}></Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/courses/add" element={<AddCourse />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
