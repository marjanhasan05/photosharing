import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import "./i18n.ts";

import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RouterProvider } from "react-router";
import routes from "./pages/routes/Routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import {  Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={routes} />
            <Toaster position="top-right" richColors />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
