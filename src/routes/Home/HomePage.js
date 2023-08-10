import React from 'react';
import { useTodos } from '../useTodos';
import { TodoCounter } from '../../ui/TodoCounter';
import { TodoSearch } from '../../ui/TodoSearch';
import { TodoList } from '../../ui/TodoList';
import { TodoItem } from '../../ui/TodoItem';
import { CreateTodoButton } from '../../ui/CreateTodoButton';
import { TodosLoading } from '../../ui/TodosLoading';
import { TodosError } from '../../ui/TodosError';
import { EmptyTodos } from '../../ui/EmptyTodos';
import { Modal } from '../../ui/Modal';
import { TodoForm } from '../../ui/TodoForm';
import { TodoHeader } from '../../ui/TodoHeader';
import { ChangeAlert } from '../../ui/ChangeAlert';


function HomePage() {
  const {
    state,
    stateUpdaters
  } = useTodos();

  const {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
  } = state

  const {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos
  } = stateUpdaters


  return (
    <>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        // loading={loading}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        // loading={loading}

        />
      </TodoHeader>


      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => (
          <>
            <TodosLoading />
            <TodosLoading />
            <TodosLoading />
          </>
        )}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={
          (searchText) => <p>No hay resultados para {searchText}</p>
        }
        render={todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onEdit={()=>console.log('llll')}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      />

      {/* <TodoList>
        {loading && (
          <>
            <TodosLoading />
            <TodosLoading />
            <TodosLoading />
          </>
        )}

        {error && <TodosError />}
        {(!loading && searchedTodos.length === 0) && <EmptyTodos />}

        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList> */}

      <CreateTodoButton
        setOpenModal={setOpenModal}
      />
      {openModal && (
        <Modal>
          <TodoForm
            addTodo={addTodo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <ChangeAlert
        sincronize={sincronizeTodos}
      />

    </>
  );
}



export {HomePage};
