import React, { useState, useRef } from 'react'
import Message from '../../components/message';

import {Todo} from '../../models/todo';
import {isTodoCompleted} from '../../utils';

interface ToDoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onSaveEdit: (id: string, value: string) => void;
}

const ToDoItem = ({todo, onDelete, onUpdateTodoStatus, onSaveEdit} : ToDoItemProps) => {
  const [isEdit, setEdit] = useState<boolean>(false)
  const [validateMessages, setMessage] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null);

  const onEditTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      if (inputRef.current.value.length === 0) {
        setMessage('Please input todo')
        return
      }
      onSaveEdit(todo.id, inputRef.current.value)
      setEdit(false)
    }
  }
  
  const onBlur = () => {
    setEdit(false)
    setMessage('')
  }

  return (
    <>
      <div className="ToDo__item">
        <div className="ToDo__item__content">
          <input
            type="checkbox"
            checked={isTodoCompleted(todo)}
            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
          />
          {isEdit ? 
            <input
              ref={inputRef}
              className='ToDo__item__edit'
              defaultValue={todo.content}
              onBlur={onBlur}
              onKeyDown={onEditTodo}
            /> :
            <span onDoubleClick={() => setEdit(true)}>{todo.content}</span>
          }
        </div>
        <button
            className="Todo__delete"
            onClick={() => onDelete(todo.id)}
        >
            X
        </button>
      </div>
      <Message message={validateMessages} className='ToDo__item__error'/>
    </>
  )
}

export default ToDoItem