import { API_URL, HEADER } from './config';
import { toJson } from './utils';

export const search = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`, HEADER)
    .then(toJson);

export const searchArtist = query =>
  search(query, 'artist');
export const searchAlbums = query =>
  search(query, 'album');
export const searchTracks = query =>
  search(query, 'track');
export const searchPlayList = query =>
  search(query, 'playlist');
