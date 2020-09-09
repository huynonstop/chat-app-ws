import React from 'react';
import { Link } from '@reach/router';
import { ReactComponent as Spinner } from '../svg/loading-spinner.svg';

export default ({ rooms, roomLoading }) => {
  let content = null;
  if (roomLoading) {
    content = (
      <div className="absolute absolute-center-xy">
        <Spinner />
      </div>
    );
  } else {
    content = Object.entries(rooms).map(([id, { type }]) => (
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
