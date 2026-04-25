import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { store } from "./store/store";

// تطبيق الثيم المحفوظ قبل أول رندر عشان نمنع وميض الشاشة البيضاء
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
