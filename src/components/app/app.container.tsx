import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import ExampleListContainer from '../example/list/example-list.container';

type AppContainerProps = {};

const AppContainer = memo<AppContainerProps>(function AppContainer() {
    return (
        <Provider store={store}>
            <ExampleListContainer />
        </Provider>
    );
});

export default AppContainer;
