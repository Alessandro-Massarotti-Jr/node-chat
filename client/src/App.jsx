import { ChatProvider } from "./providers/Chat";
import { UserProvider } from "./providers/User";
import Router from "./Router";


function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <Router />
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
