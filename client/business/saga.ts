import {all, put, takeLatest} from 'redux-saga/effects';
import {actions, actionTypes} from './actions';

const API_HOST = 'http://localhost:8000';

function* loadDataSaga() {
    try {
        const res = yield fetch(`${API_HOST}/list`);
        const data = yield res.json();
        yield put(actions.list.itemsLoaded(data))
    } catch (err) {
        yield put(actions.list.requestFailed(err))
    }
}

function* saveItemSaga(payload) {
    const item = payload.data;

    try {
        let res;
        const body = JSON.stringify(item);

        if (item.id) {
            res = yield fetch(`${API_HOST}/list/item/${item.id}`, {
                method: 'put',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
        } else {
            res = yield fetch(`${API_HOST}/list/item`, {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
        }

        const data = yield res.json();
        yield put(actions.list.itemLoaded(data));
    } catch (err) {
        yield put(actions.list.requestFailed({ message: err.message }));
    }
}

function* deleteItemSaga(payload) {
    const id = payload.data;

    try {
        yield fetch(`${API_HOST}/list/item/${id}`, {
            method: 'delete',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        });
        yield put(actions.list.itemDeleted(id));
    } catch (err) {
        yield put(actions.list.requestFailed(err));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(actionTypes.list.LOAD_ITEMS, loadDataSaga),
        takeLatest(actionTypes.list.SAVE_ITEM, saveItemSaga),
        takeLatest(actionTypes.list.DELETE_ITEM, deleteItemSaga),
    ])
}

export default rootSaga;

