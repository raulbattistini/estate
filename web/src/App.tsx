import React from "react";
import { RoutesList } from "./routes";
import { RegisterProvider } from "./contexts/Register/RegisterContext";
import { AuthProvider } from "./contexts/Auth/AuthProvider";

function App() {
  return (
    <RegisterProvider>
      <AuthProvider>
      <RoutesList />
      </AuthProvider>
    </RegisterProvider>
  );
}

export default App;
