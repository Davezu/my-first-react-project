import { useState, useEffect } from "react";

export type Todo = {
    id:string;
    userID:string;
    title:string;
    completed:boolean;
}

export function Todos(){
    const {todos, loading} = useFetchTodos();
    
    if (loading){
        return <div>Loading.....</div>
    }
    
    return <div>
        {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
        ))}
    </div>
}

export function useFetchTodos(){
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchTodos = async () => {
        setLoading(true);
        const response = await fetch ("https://jsonplaceholder.typicode.com/todos")
        const data = await response.json();
        setTodos(data);
        setLoading(false);
    } 
    
    useEffect(() => {
        fetchTodos();
    }, []);

    return {todos, loading};
}


