import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const blankColor = [
    {
        code:{hex:''},
        color:'',
        id:0
    }
]

const colors = [
    {
        code:{hex:'00000'},
        color:'black',
        id:0
    },
    {
        code:{hex:'FFFFF'},
        color:'white',
        id:1
    }

]
test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={blankColor}/>)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={colors}/>)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={colors} editing={true} />)
    let editMenu = screen.queryByText("edit color")
    expect(editMenu).toBeInTheDocument()

    rerender(<ColorList colors={colors} editing={false} />);
    editMenu = screen.queryByText("edit color")
    expect(editMenu).toBeNull();


});
