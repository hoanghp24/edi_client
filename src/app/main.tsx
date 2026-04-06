import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/shared/styles/global.scss';
import App from '@/app/App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/app/store';
import { injectStore } from '@/shared/api';

// Inject store to apiClient to avoid circular dependency
injectStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
