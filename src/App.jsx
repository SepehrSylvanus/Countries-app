import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import EachCountry from "./pages/eachCountry/EachCountry";
import AllCountries from "./pages/allCountries/AllCountries";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainPage />}>
          <Route path="home" element={<AllCountries />} />
          <Route path=":countryName" element={<EachCountry/>} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
