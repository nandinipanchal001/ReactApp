import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CustomerTable from "./pages/customer/CustomerTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/customer" element={<CustomerTable />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
