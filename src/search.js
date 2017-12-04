import { token } from '../.env';
import { API_URL } from '../config';
import { toJson } from './utils';

export const search = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(toJson);

export const searchArtist = query =>
  search(query, 'artist');
export const searchAlbums = query =>
  search(query, 'album');
export const searchTracks = query =>
  search(query, 'track');
export const searchPlayList = query =>
  search(query, 'playlist');
