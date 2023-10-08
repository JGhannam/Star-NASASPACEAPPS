import React, { useState, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import "./index.scss";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "regenerator-runtime/runtime";
import Canvas_moon from "./MoonQuake/Pages/Canvas_moon";

// components
const Tulipsai = React.lazy(() => import("./components/aichat/tulipsai"));
const Errorsim = React.lazy(() => import("./components/errorsim/errorsim"));
const Loading = React.lazy(() => import("./layouts/loading/loading"));
const Left = React.lazy(() => import("./components/left/left"));

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add event listener for route change
    const handleRouteChange = () => {
      window.location.reload();
    };

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      // Remove event listener when the component unmounts
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <div className="AppContainer">
      <Suspense fallback={<Loading />}>
        <div className="MainScreen">
          <Errorsim />
          <Tulipsai />
          <Left />

          <div className="credit">
            <p>Algorithmic Avengers</p>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/moon" element={<Canvas_moon />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </Provider>
  // </React.StrictMode>
);
