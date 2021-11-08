import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor, store} from './app/store';
import App from './App';

describe('App',() => {
    let container, getByText;
    beforeEach(() => {
        const component = render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
        container = component.container;
        getByText = component.getByText;
    });
    it('"Page 01" should be found in the html code', () => {
        expect(getByText(/Page 01/i)).toBeInTheDocument();
    });
    it('"list:" should be found in the html code', () => {
        expect(getByText(/list:/i)).toBeInTheDocument();
    });
});
