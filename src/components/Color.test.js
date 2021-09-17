import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const blankColor = {
    code : {hex:''},
    color:''
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={blankColor}/>)
});
const white = {
    code: {hex:'FFFFF'},
    color:'White'
}
test("Renders the color passed into component", () => {
    render(<Color color ={white}/>)
    expect(screen.getByTestId('color')).toBeInTheDocument()
    const name = screen.getByText('White');
    expect(name).toBeInTheDocument()

});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockHandleDelete = jest.fn()
    const mockToggleEdit = jest.fn()
    render(<Color color={white} deleteColor={mockHandleDelete} toggleEdit={mockToggleEdit} />)
    const deleteBtn = screen.getByTestId('delete')
    userEvent.click(deleteBtn)
    expect(mockHandleDelete).toBeCalledTimes(1)
    expect(mockToggleEdit).toBeCalledTimes(1)
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockSetEditColor = jest.fn()
    const mockToggleEdit = jest.fn()
    render(<Color color={white} setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit} />)
    const colorDiv = screen.getByTestId('color')
    userEvent.click(colorDiv)
    expect(mockSetEditColor).toBeCalledTimes(1)
    expect(mockToggleEdit).toBeCalledTimes(1)
});