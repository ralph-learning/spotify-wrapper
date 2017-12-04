import { searchAlbums } from '../src/main';

const albums = searchAlbums('Bon Jovi');
albums.then(data => data.albums.items.map(item => console.log(item.name)));
