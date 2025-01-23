import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore, type StoreApi } from 'zustand';

export const createStoreContext = <T, S extends StoreApi<T>>(
	createStore: (initialState?: T) => S,
) => {
	const Context = createContext<S | undefined>(undefined);

	const Provider = ({ children, value }: { children: ReactNode; value?: T }) => {
		const storeRef = useRef<S | null>(null);
		if (!storeRef.current) {
			storeRef.current = createStore(value);
		}

		return <Context.Provider value={storeRef.current}>{children}</Context.Provider>;
	};

	const useStoreHook = <U,>(selector: (store: T) => U): U => {
		const store = useContext(Context);
		if (!store) {
			throw new Error('useStoreHook must be used within a StoreProvider');
		}
		return useStore(store, selector);
	};

	return { Provider, useStoreHook, Context };
};
