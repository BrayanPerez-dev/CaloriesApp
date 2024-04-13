import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes';

export default function App():JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
       <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

