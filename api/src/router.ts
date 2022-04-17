import { Router } from 'oak/mod.ts';
import { ListService } from 'src/services/index.ts';
import { PayloadValidatorHelper, ResponseHelper } from 'src/helpers/index.ts';
import { ShoppingListItemSchema } from 'lib/schemas/index.ts';

const router = new Router();
router
	.get('/list', (context) => {
		ResponseHelper.json(context, ListService.getAll());
	})
	.post('/list/item', async (context) => {
		const payload = await context.request.body().value;
		PayloadValidatorHelper.json(payload, ShoppingListItemSchema);

		const item = ListService.addItem(payload);

		ResponseHelper.json(context, item, 201);
	})
	.put('/list/item/:id', async (context) => {
		const payload = await context.request.body().value;
		PayloadValidatorHelper.json(payload, ShoppingListItemSchema);

		const item = ListService.updateItem(context.params['id'], payload);

		ResponseHelper.json(context, item, 200);
	})
	.delete('/list/item/:id', (context) => {
		ListService.deleteItem(context.params['id']);
		ResponseHelper.json(context, undefined, 200);
	});

export default router;
