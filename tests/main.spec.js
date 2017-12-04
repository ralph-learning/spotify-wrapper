import { expect } from 'chai';
import { search, searchAlbuns, searchArtist, searchTracks, searchPlayList } from '../src/main';

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.be.a('function');
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.be.a('function');
    });

    it('should exist the searchArtist method', () => {
      expect(searchArtist).to.be.a('function');
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.be.a('function');
    });

    it('should exist the searchPlayList method', () => {
      expect(searchPlayList).to.be.a('function');
    });
  });
});
