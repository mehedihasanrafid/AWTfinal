import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext=createContext(null);
export function ThemeProvider({children}){const [theme,setTheme]=useState(()=>localStorage.getItem('dashboard-theme')||'light');useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('dashboard-theme',theme)},[theme]);return <ThemeContext.Provider value={{theme,toggleTheme:()=>setTheme(value=>value==='light'?'dark':'light')}}>{children}</ThemeContext.Provider>}
ThemeProvider.propTypes={children:PropTypes.node.isRequired};
export const useTheme=()=>useContext(ThemeContext);
