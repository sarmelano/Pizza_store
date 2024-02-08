import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '../../components/MenuItem';
import { fetchMenu } from '../../redux/slices/MenuSlice';
import Loading from '../../components/feedback/Loading';
import Error from '../../components/feedback/Error';

function Menu() {
  const dispatch = useDispatch();
  const { menu, status, error } = useSelector((state) => state.menu);

  useEffect(() => { if (status === 'idle') dispatch(fetchMenu()); }, [dispatch, status]);
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'failed') {
    return <Error message={error} />;
  }

  return (
    <ul className='menu'>
      {menu.map(item =>
        <MenuItem item={item} key={item.id} />
      )}
    </ul>
  );
}

export default Menu;