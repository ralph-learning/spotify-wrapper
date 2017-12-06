import {
  search,
  searchAlbums,
  searchArtist,
  searchPlayList,
  searchTracks,
} from './search';

import {
  getAlbum,
  getAlbums,
  getAlbumTracks,
} from './album';

// export {
//   search,
//   searchAlbums,
//   searchArtist,
//   searchPlayList,
//   searchTracks,
//   getAlbum,
//   getAlbums,
//   getAlbumTracks,
// };
import { API_URL } from './config';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  }

  request(path) {
    const header = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return fetch(path, header);
  }
}
