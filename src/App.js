// import React,{useEffect,useState} from 'react'
// import './App.css'
// import TodoContainer from './Components/TodoContainer'
// import {Coloring} from ""

// function App() {
// const [json,setJson] = useState([])
// const[loading,setLoading] = useState(false)

// useEffect(()=>{
//   fetch("https://jsonplaceholder.typicode.com/users/1/todos")
//   .then((response)=> response.json())
//   .then((json)=>{
//     setTimeout(()=>{
//       setJson(json)
//       setLoading(true);
//     }, 1000);

//   });
// });

//   return (
//     <>
//     {loading ? (<TodoContainer jsonTodos={json}/>
//     ):(
//       <Coloring 
//       visible={true}
//       height="80"
//       width="80"
//       ariaLabel = "blocks-wrapper"
//       colors={['#e15b64','#f47e60','#f8b26a','#abbd81','#849b87']}
//       />
//     )}
// </>
//     );
// }
// export default App;

import React from 'react'
import Home from './component/Home'
import Task from './component/Task';
import Todo from './component/Todo';
function App() {
  return (  
    // <Home></Home>
 <Task></Task>
);
}

export default App ;