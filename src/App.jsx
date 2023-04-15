import { Route, Routes } from "react-router-dom";
import AdminLayouts from "./layouts/AdminLayouts";
import ClientLayouts from "./layouts/ClientLayouts";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<ClientLayouts />} />
        <Route path="/admin/*" element={<AdminLayouts />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Fragment>
  );
}

export default App;
