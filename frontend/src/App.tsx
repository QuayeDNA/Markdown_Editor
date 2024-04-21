import Home from "./pages/Home"
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { toggleTheme } from './redux/themeSlice';
import MessageCard from "./components/ui/messageCard";

import './App.css'

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      dispatch(toggleTheme());
    }
  }, [dispatch]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div>
      <Home />
      <MessageCard/>
    </div>
  )
}

export default App;
