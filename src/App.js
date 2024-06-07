import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CustomerTable from "./pages/customer/CustomerTable";
import SideBar from "./components/sidebar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SideBar/>
      <Router>
        <Routes>
          <Route path="/customer" element={<CustomerTable />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
