import './App.css';
import { ChatBox } from './components/ChatBox';

function App() {
  return (
    <div className='flex h-screen'>
      <ChatBox className='m-auto w-1/3 h-2/3' />
    </div>
  );
}

export default App;
