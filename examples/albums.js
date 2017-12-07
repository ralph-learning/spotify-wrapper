import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQC59542Qdvc0nfl2pr2_VituHBajvsToJGlEtba0Is1EOE8p1s17hoVAPmZG9iBtm4vTL7PcfmRaKGXAmhTyg-3NOqfvk30XHUpKURKhypaXUSFuKWOoLWDEI5PzSm2crk8_8sibL0',
});

const artist = spotify.search.artist('Metallica');

artist
  .then(response => response.json())
  .then(data => data.artists.items.map(item => console.log(item.name)))
  .catch(error => console.log(error));
