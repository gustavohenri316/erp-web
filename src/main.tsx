import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import { Providers } from "./providers/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
