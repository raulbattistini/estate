import React from "react";
import { RoutesList } from "./routes";
import { RegisterProvider } from "./contexts/Register/RegisterContext";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { SuperTokensProvider } from "./contexts/OAuth/SuperTokensProvider";

function App() {
  return (
    <SuperTokensProvider>
      <RegisterProvider>
        <AuthProvider>
          <RoutesList />
        </AuthProvider>
      </RegisterProvider>
    </SuperTokensProvider>
  );
}

export default App;
