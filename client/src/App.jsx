import {BrowserRouter as Router} from 'react-router-dom'
import { Suspense, lazy } from 'react';
import PageLoader from '@/components/PageLoader';

const WrapApp = lazy(() => import('@/apps/WrapApp'));

function App() {
  return (
      <Router>
        <Suspense fallback={<PageLoader />}>
          <WrapApp />
        </Suspense>
      </Router>
  );
}

export default App;
