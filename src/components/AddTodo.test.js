import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('AddTodo', () => {
  test('should call addTodo function when Add button is clicked', async () => {
    const addTodoMock = jest.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    const inputElement = screen.getByPlaceholderText('Add a todo');
    fireEvent.change(inputElement, { target: { value: 'Test todo' } });

    const addButtonElement = screen.getByText('Add');
    fireEvent.click(addButtonElement);

    await waitFor(() => {
      expect(addTodoMock).toHaveBeenCalledTimes(1);
      expect(addTodoMock).toHaveBeenCalledWith({
        content: 'Test todo',
        done: false,
        edit: false,
      });
    });
  });

  test('should not call addTodo function when Add button is clicked and input value is empty', async () => {
    const addTodoMock = jest.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    const addButtonElement = screen.getByText('Add');
    fireEvent.click(addButtonElement);

    await waitFor(() => {
      expect(addTodoMock).not.toHaveBeenCalled();
    });
  });

  test('should call addTodo function when Enter key is pressed and input value is not empty', async () => {
    const addTodoMock = jest.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    const inputElement = screen.getByPlaceholderText('Add a todo');
    fireEvent.change(inputElement, { target: { value: 'Test todo' } });

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(addTodoMock).toHaveBeenCalledTimes(1);
      expect(addTodoMock).toHaveBeenCalledWith({
        content: 'Test todo',
        done: false,
        edit: false,
      });
    });
  });

  test('should not call addTodo function when Enter key is pressed and input value is empty', async () => {
    const addTodoMock = jest.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    const inputElement = screen.getByPlaceholderText('Add a todo');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(addTodoMock).not.toHaveBeenCalled();
    });
  });
});
