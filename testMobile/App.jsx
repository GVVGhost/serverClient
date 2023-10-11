import React from 'react';
import {AuthProvider} from 'utils/AuthContext';
import {Navigator} from 'navigation/Navigator';

function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;
