import { useState, useEffect } from 'react';
import { PIZZA_API } from '../../constants/data';
import MenuItem from './MenuItem';

function Menu() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const response = await fetch(`${PIZZA_API}/menu`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result.data);
        }
      } catch (e) {
        if (isMounted) {
          setError(e);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getData();

    // Clean effect
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // render if there is no error and fetch ok
  return (
    <ul className='menu_items'>
      {data && data.map(item =>
        <MenuItem item={item} key={item.id} />
      )}
    </ul>
  );
}

export default Menu;