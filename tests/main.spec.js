import chai, { expect } from 'chai';
import sinon from 'sinon';
import sionChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtist, searchTracks, searchPlayList } from '../src/main';

global.fetch = require('node-fetch');

chai.use(sionChai);
sinonStubPromise(sinon);

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.be.a('function');
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbums).to.be.a('function');
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

  describe('Generic Search', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call feth function', () => {
      search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receibe he correct url  fetch', () => {
      context('passing one type', () => {
        search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        search('Incubus', 'albums');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=albums');
      });

      context('pass more then one type', () => {
        search('Incubus', ['artist', 'albums']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,albums');
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });

      const artists = search('Incubus', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
