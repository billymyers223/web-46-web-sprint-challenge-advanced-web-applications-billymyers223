import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';
import fetchColorService from '../services/fetchColorService'


test("Renders without errors", ()=> {
    render(<BubblePage/>)
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    render(<BubblePage/>)
    const colorsOnScreen = screen.queryAllByTestId('color');
    expect(colorsOnScreen).toHaveLength(0);
});