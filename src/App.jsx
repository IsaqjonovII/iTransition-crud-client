import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "routes";

const App = () => {
  let user = sessionStorage.getItem("user");
  return (
    <div>
      <Routes>
        {user
          ? privateRoutes.map(({ key, path, Component }) => (
              <Route key={key} path={path} element={<Component />} />
            ))
          : publicRoutes.map(({ key, path, Component }) => (
              <Route key={key} path={path} element={<Component />} />
            ))}
      </Routes>
    </div>
  );
};

export default App;
