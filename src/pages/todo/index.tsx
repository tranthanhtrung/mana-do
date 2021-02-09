import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from '../../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../../store/actions';
import Service from '../../service';
import {TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';
import ToDoList from './todolist'
import './todo.css'

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDo = ({history}: RouteComponentProps) => {
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    // when a dispatch() of OOTB useReducer is called, some instances calls the reduce() twice.
    // https://github.com/facebook/react/issues/16295
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value.length > 0) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(await createTodo(resp));
                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            <h2>TO DO</h2>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <ToDoList 
                todos={todos}
                showing={showing}
                onDelete={(id) => dispatch(deleteTodo(id))}
                onUpdateTodoStatus={(e, id) => onUpdateTodoStatus(e, id)}
                onSaveEdit={(id, value) => dispatch(updateTodo(id, value))}
            />
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="button--default" onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className="button--active" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="button--completed" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="button--warning" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDo;