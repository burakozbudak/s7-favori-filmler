import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/* react-router-dom@5 paketini kur */
import { BrowserRouter } from "react-router-dom";
/* Routing kullanmak için gereken react-router wrapperı ile App componentını sar. */
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
createRoot(document.getElementById("root")).render(<App />);
