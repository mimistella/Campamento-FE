import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
///import { AppContextProvider } from '../context/AppContext';

const queryClient = new QueryClient();

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AppContextProvider>{children}</AppContextProvider> */}
    </QueryClientProvider>
  );
}