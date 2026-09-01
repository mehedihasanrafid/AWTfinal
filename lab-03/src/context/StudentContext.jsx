import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const initialStudents=[
 {id:'2024001',name:'Aisha Rahman',avatar:'AR',gpa:3.92,major:'Computer Science',credits:96,courses:[['React','blue'],['Algorithms','violet']]},
 {id:'2024002',name:'Nafis Ahmed',avatar:'NA',gpa:3.74,major:'Software Engineering',credits:84,courses:[['Node.js','green'],['Databases','amber']]},
 {id:'2024003',name:'Sadia Karim',avatar:'SK',gpa:3.86,major:'Information Systems',credits:78,courses:[['UI/UX','pink'],['Networks','blue']]},
 {id:'2024004',name:'Tanvir Hasan',avatar:'TH',gpa:3.65,major:'Data Science',credits:90,courses:[['Python','green'],['Machine Learning','violet']]},
];
const StudentContext=createContext(null);
export function StudentProvider({children}){const [students,setStudents]=useState(()=>{try{return JSON.parse(localStorage.getItem('dashboard-students'))||initialStudents}catch{return initialStudents}});const [query,setQuery]=useState('');const [sort,setSort]=useState('default');const [favorites,setFavorites]=useState([]);useEffect(()=>localStorage.setItem('dashboard-students',JSON.stringify(students)),[students]);const displayed=useMemo(()=>{const q=query.toLowerCase().trim();const filtered=students.filter(s=>s.name.toLowerCase().includes(q)||s.major.toLowerCase().includes(q));if(sort==='name')return [...filtered].sort((a,b)=>a.name.localeCompare(b.name));if(sort==='gpa')return [...filtered].sort((a,b)=>b.gpa-a.gpa);return filtered},[students,query,sort]);useEffect(()=>{document.title=`Dashboard - ${displayed.length} Student${displayed.length===1?'':'s'}`},[displayed.length]);const toggleFavorite=id=>setFavorites(items=>items.includes(id)?items.filter(item=>item!==id):[...items,id]);const addStudent=student=>setStudents(items=>[...items,student]);const removeStudent=id=>{setStudents(items=>items.filter(item=>item.id!==id));setFavorites(items=>items.filter(item=>item!==id))};return <StudentContext.Provider value={{students,displayed,query,setQuery,sort,setSort,favorites,toggleFavorite,addStudent,removeStudent}}>{children}</StudentContext.Provider>}
StudentProvider.propTypes={children:PropTypes.node.isRequired};
export const useStudents=()=>useContext(StudentContext);
