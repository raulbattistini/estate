import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RoutesList } from "./routes";
import { RegisterProvider } from "./contexts/Register/RegisterContext";
import { AuthProvider } from "./contexts/Auth/AuthProvider";

function App() {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
      <RegisterProvider>
        <AuthProvider>
          <RoutesList />
        </AuthProvider>
      </RegisterProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
