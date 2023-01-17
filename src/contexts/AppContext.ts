import React, { MutableRefObject, Ref } from 'react';

export interface _AppContext {
    modalContainerRef: MutableRefObject<unknown> | Ref<Element> | undefined;
}

const AppContext = React.createContext<_AppContext>({
    modalContainerRef: undefined
});

export default AppContext;
