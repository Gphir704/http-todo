import "./App.css";

import routes from "../src/routes/router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
}

export default App;
