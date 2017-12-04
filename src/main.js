export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then(response => response.json());
export const searchArtist = query =>
  search(query, 'artist');
export const searchAlbums = () => {};
export const searchTracks = () => {};
export const searchPlayList = () => {};
