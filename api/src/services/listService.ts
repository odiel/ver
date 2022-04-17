import { v4 } from 'uuid/mod.ts';
import { ShoppingListCache } from 'lib/cache/cache.ts';
import { ShoppingListItem } from 'lib/types.ts';

const ListService = {
	addItem(item: ShoppingListItem): ShoppingListItem {
		if (!item.id) {
			item.id = v4.generate();
		}

		ShoppingListCache.push(item);

		return item;
	},

	updateItem(id: string, item: ShoppingListItem): ShoppingListItem {
		const index = ShoppingListCache.findIndex((e) => e.id === id);

		if (index > -1) {
			const nItem = {
				...item,
				id,
			};

			ShoppingListCache[index] = nItem;

			return nItem;
		} else {
			throw new Error('Item not found');
		}
	},

	getAll(): ShoppingListItem[] {
		return ShoppingListCache;
	},

	deleteItem(id: string) {
		const index = ShoppingListCache.findIndex((e) => e.id === id);
		if (index > -1) {
			ShoppingListCache.splice(index, 1);
		}
	},
};

export default ListService;
