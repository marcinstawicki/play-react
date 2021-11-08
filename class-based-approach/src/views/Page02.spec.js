import React from 'react';
import renderer from 'react-test-renderer';
import Page02 from "./Page02";
import {BrowserRouter} from "react-router-dom";

describe('Page02',() => {

    it('should match the snapshot', () => {
        const clickHandlerOnHistoryPush = jest.fn();
        const tree = renderer.create(
            <BrowserRouter>
                <Page02 onHistoryPush={clickHandlerOnHistoryPush}/>
            </BrowserRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('the correct button should handle click in a proper way', () => {
        const clickHandlerOnHistoryPush = jest.fn();
        const component = renderer.create(
            <BrowserRouter>
                <Page02 onHistoryPush={clickHandlerOnHistoryPush}/>
            </BrowserRouter>
        );
        const rootInstance = component.root;
        const button = rootInstance.findByType('button');
        expect(button.props.children).toMatch('redirect to page 01');
        button.props.onClick();
        expect(clickHandlerOnHistoryPush).toHaveBeenCalledTimes(1);
    });
});
