import { Provider } from "react-redux";
import { store } from "./store/store";

import AppContent from "./components/AppContent";

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
