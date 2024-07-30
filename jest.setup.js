import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

jest.mock('react-native-safe-area-context', () => {
  const SafeAreaInsetsContext = React.createContext({
    insets: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest.fn(),
    SafeAreaInsetsContext,
  };
});
