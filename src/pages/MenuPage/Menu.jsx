import { PIZZA_API } from '../../constants/data';
import MenuItem from '../../components/MenuItem';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/feedback/Loading';
import Error from '../../components/feedback/Error';

function Menu() {
  const { data, error, isLoading } = useFetch(`${PIZZA_API}/menu`);

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <Error message={error.message}/>
  }

//render if there is no error and fetch is ok
  return (
    <ul className='menu_items'>
      {data && data.map(item =>
        <MenuItem item={item} key={item.id} />
      )}
    </ul>
  );
}

export default Menu;