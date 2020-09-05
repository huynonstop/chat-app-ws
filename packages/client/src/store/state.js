import { atom } from 'recoil';
import { COUNT_IO, AUTH, ROOM } from './atom';

export const countIOState = atom(COUNT_IO);

export const authState = atom(AUTH);

export const roomState = atom(ROOM);
