import { ContextHolder } from "@frontegg/rest-api";
import { useEffect } from "react";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { AdminPortal } from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();

  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const handleClick = () => {
    AdminPortal.show();
  };

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;

    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h1>Welcome {user.name}</h1>
          <button onClick={handleClick}>Settings</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please login</h1>
          <button onClick={loginWithRedirect}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
