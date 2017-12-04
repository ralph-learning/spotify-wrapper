import { token } from '../.env';

export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json());

export const searchArtist = query =>
  search(query, 'artist');
export const searchAlbums = query =>
  search(query, 'album');
export const searchTracks = query =>
  search(query, 'track');
export const searchPlayList = query =>
  search(query, 'playlist');
