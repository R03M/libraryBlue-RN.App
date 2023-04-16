import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './Navigation';
import UpdateApp from './src/components/UpdateApp';
import { useState } from 'react';

export default function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  return (
    <Provider store={store}>
      {updateAvailable ? (
        <UpdateApp setUpdateAvailable={setUpdateAvailable} />
      ) : (
        <Navigation />
      )}
    </Provider>
  );
}
