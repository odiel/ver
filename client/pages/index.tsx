import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NextPage} from 'next';

import {actions, ApplicationState, SectionStatus} from '../business/';
import {NavBar, ItemsContainer, PageLoader} from '../components';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const listStatus = useSelector((state: ApplicationState) => state.shoppingList.status);

    useEffect(() => {
        dispatch(actions.list.loadItems())
    }, [dispatch]);

    let content = <PageLoader/>;

    if (listStatus == SectionStatus.DONE) {
        content = <ItemsContainer/>;
    }

    return (
        <div>
            <NavBar/>
            {content}
        </div>
    );
};


export default Home;
