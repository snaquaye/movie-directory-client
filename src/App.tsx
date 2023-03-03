import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Landing } from "./pages";
import { DetailPage } from "./pages/DetailPage";
import { SearchPage } from "./pages/SearchPage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/movie" element={<SearchPage />}>
                <Route path="/movie/detail/:movieId" element={<DetailPage />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
