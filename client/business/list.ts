import { ApplicationState } from './state';
import { ReducerAction } from './reducer';
import { ApiError, SectionState, SectionStatus } from './types';

export type ShoppingListItem = {
    id: string;
    name: string;
    description?: string;
    quantity: number;
    isPurchased: boolean;
}

export type ShoppingListState = {
    list: ShoppingListItem[];
    editItem: null | 'new' | ShoppingListItem;
} & SectionState;

export const initialState: ShoppingListState = {
    list: [],
    editItem: null,
    status: SectionStatus.IDLE,
    error: null,
};


export const actionTypes = {
    LOAD_ITEMS: 'LOAD_ITEMS',
    ITEMS_LOADED: 'ITEMS_LOADED',
    REQUEST_FAILED: 'REQUEST_FAILED',
    ADD_ITEM: 'ADD_ITEM',
    EDIT_ITEM: 'EDIT_ITEM',
    CANCEL_ITEM: 'CANCEL_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
    SAVE_ITEM: 'SAVE_ITEM',
    ITEM_LOADED: 'ITEM_LOADED',
    ITEM_DELETED: 'ITEM_DELETED',
};


export const actions = {
    loadItems: () => ({type: actionTypes.LOAD_ITEMS}),
    itemsLoaded: (data: ShoppingListItem[]) => ({type: actionTypes.ITEMS_LOADED, data}),
    requestFailed: (error: ApiError) => ({type: actionTypes.REQUEST_FAILED, error}),
    addItem: () => ({type: actionTypes.ADD_ITEM}),
    editItem: (item: ShoppingListItem) => ({type: actionTypes.EDIT_ITEM, data: item}),
    cancelItem: () => ({type: actionTypes.CANCEL_ITEM}),
    deleteItem: (data: string) => ({type: actionTypes.DELETE_ITEM, data}),
    saveItem: (item: ShoppingListItem) => ({type: actionTypes.SAVE_ITEM, data: item}),
    itemLoaded: (data: ShoppingListItem) => ({type: actionTypes.ITEM_LOADED, data}),
    itemDeleted: (data: string) => ({type: actionTypes.ITEM_DELETED, data}),
};

export const reducer = (state: ApplicationState, { type, error, data } : ReducerAction) => {

    switch (type) {
        case actionTypes.LOAD_ITEMS:
            return { ...state, shoppingList: { ...initialState, status: SectionStatus.LOADING } };
        case actionTypes.ITEMS_LOADED:
            return { ...state, shoppingList: { ...state.shoppingList, list: [...data], status: SectionStatus.DONE } };
        case actionTypes.REQUEST_FAILED:
            return { ...state, shoppingList: { ...state.shoppingList, error, status: SectionStatus.DONE } };
        case actionTypes.ADD_ITEM:
            return { ...state, shoppingList: { ...state.shoppingList, error: null, editItem: 'new' } };
        case actionTypes.EDIT_ITEM:
            return { ...state, shoppingList: { ...state.shoppingList, error: null, editItem: data } };
        case actionTypes.CANCEL_ITEM:
            return { ...state, shoppingList: { ...state.shoppingList, error: null, editItem: null } };
        case actionTypes.SAVE_ITEM:
            return { ...state, shoppingList: { ...state.shoppingList, error: null, editItem: null, status: SectionStatus.LOADING  } };
        case actionTypes.DELETE_ITEM:
            return { ...state, shoppingList: { ...state.shoppingList, error: null, editItem: null, status: SectionStatus.LOADING  } };
        case actionTypes.ITEM_LOADED:
            const ix = state.shoppingList.list.findIndex((e: ShoppingListItem) => e.id === data.id);
            const list1 = ix === -1 ? [...state.shoppingList.list, data] : [...( state.shoppingList.list.splice(ix, 1, data) && state.shoppingList.list )];
            return { ...state, shoppingList: { ...state.shoppingList, list: list1, error: null, status: SectionStatus.DONE } };
        case actionTypes.ITEM_DELETED:
            const list2 = state.shoppingList.list.filter((e: ShoppingListItem) => e.id !== data);
            return { ...state, shoppingList: { ...state.shoppingList, list: list2, error: null, status: SectionStatus.DONE } };
    }

    return state;
};
