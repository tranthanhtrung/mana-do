import React from 'react'

import {Todo} from '../../models/todo';
import {TodoStatus} from '../../models/todo';
import ToDoItem from './todoItem'

interface ToDoListProps {
  todos: Todo[];
  showing: string;
  onDelete: (id: string) => void;
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onSaveEdit: (id: string, value: string) => void;
}

const ToDoList = ({todos, showing, onDelete, onUpdateTodoStatus, onSaveEdit} : ToDoListProps) => {
  const showTodos = todos.filter((todo) => {
    switch (showing) {
        case TodoStatus.ACTIVE:
            return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
            return todo.status === TodoStatus.COMPLETED;
        default:
            return true;
    }
  });

  return (
    <div className="ToDo__list">
      {
        showTodos.map((todo, index) => {
          return (
            <ToDoItem
              key={index}
              todo={todo}
              onDelete={(id) => onDelete(id)}
              onUpdateTodoStatus={(e, id) => onUpdateTodoStatus(e, id)}
              onSaveEdit={(id, value) => onSaveEdit(id, value)}
            />
          );
        })
      }
    </div>
  )
}

export default ToDoList