import { useState, useEffect } from 'react';
import { api } from '../utils';

export default (token) => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
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

  return [loading, rooms, createNewGroup];
};
