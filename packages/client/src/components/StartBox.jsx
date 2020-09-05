import React, { useRef, useState } from 'react';
import { api } from '../utils';
import { ReactComponent as Spinner } from '../svg/loading-spinner.svg';

const StartBox = ({
  className, username, inviteCode, token, setRooms,
}) => {
  const [loading, setLoading] = useState(false);
  const joinRef = useRef(null);
  const onSubmit = e => {
    e.preventDefault();
    console.log(joinRef.current.value);
    joinRef.current.value = '';
  };
  const createNewGroup = async () => {
    try {
      setLoading(true);
      const { data } = await api('room', {
        method: 'POST',
        token,
      });
      setRooms(prevState => ([
        ...prevState,
        data,
      ]));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  let content = null;
  if (loading) {
    content = (
      <div className="absolute absolute-center-xy">
        <Spinner />
      </div>
    );
  } else {
    content = [
      <form key={1} className="search-row" onSubmit={onSubmit}>
        <input ref={joinRef} placeholder="Friend code ..." />
        <button style={{ display: 'none' }} type="submit">
          hidden
        </button>
      </form>,
      <div key={2} className="w-100 text-center mt-3">
        <button
          className="btn btn-main bg-sidebar"
          onClick={createNewGroup}
          type="button"
        >
          New group
        </button>
      </div>,
    ];
  }

  return (
    <div className={className}>
      <p className="font-2x">
        Welcome
        {' '}
        {username}
        (#
        {inviteCode}
        )
      </p>
      {content}
    </div>
  );
};

export default StartBox;
