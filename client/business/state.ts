
import { initialState as listInitialState, ShoppingListState } from './list';

export type ApplicationState = {
    shoppingList: ShoppingListState
}

export const initialState: ApplicationState = {
    shoppingList: { ...listInitialState }
};
