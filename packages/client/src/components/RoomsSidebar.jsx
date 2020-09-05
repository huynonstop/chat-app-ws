import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { api } from '../utils';
import { ReactComponent as Spinner } from '../svg/loading-spinner.svg';

export default ({ rooms, setRooms, token }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await api('room', { token });
        setRooms(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [token, setRooms]);
  let content = null;
  if (loading) {
    content = (
      <div className="absolute absolute-center-xy">
        <Spinner />
      </div>
    );
  } else {
    content = rooms.map(({ _id: id, type }) => (
      <div key={id}>
        <Link
          to={`/${id}`}
          getProps={({ isCurrent }) => ({
            style: {
              color: isCurrent ? 'red' : 'blue',
            },
          })}
        >
          {id}
        </Link>
        {type}
      </div>
    ));
  }
  return (
    <div className="sidebar relative flex-1/4-lg h-screen of-y-a scrollbar">
      {content}
    </div>
  );
};
