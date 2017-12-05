import { API_URL, HEADER } from './config';
import { toJson } from './utils';

export const getAlbum = id =>
  fetch(`${API_URL}/albums/${id}`, HEADER)
    .then(toJson);

export const getAlbums = ids =>
  fetch(`${API_URL}/albums/?ids=${ids}`, HEADER)
    .then(toJson);

export const getAlbumTracks = id =>
  fetch(`${API_URL}/albums/${id}/tracks`, HEADER)
    .then(toJson);
