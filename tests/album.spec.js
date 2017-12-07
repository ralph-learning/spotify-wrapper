import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Album', () => {
  let fetchedStub;
  let promise;
  let spotify;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbum();
      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('should call fetch with correct url', () => {
      spotify.album.getAlbum('0lw68yx3MhKflWFqCsGkIs');
      expect(fetchedStub).to.been.have
        .calledWith(`${spotify.apiURL}/albums/0lw68yx3MhKflWFqCsGkIs`);

      spotify.album.getAlbum('3Ad4QdO0EJr1c2livr9cmm');
      expect(fetchedStub).to.been.have
        .calledWith(`${spotify.apiURL}/albums/3Ad4QdO0EJr1c2livr9cmm`);
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'Album' });
      const album = spotify.album.getAlbum('0lw68yx3MhKflWFqCsGkIs');

      expect(album.resolveValue).to.be.eql({ body: 'Album' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      spotify.album.getAlbums(['0lw68yx3MhKflWFqCsGkIs', '3Ad4QdO0EJr1c2livr9cmm']);
      expect(fetchedStub).to.been.have
        .calledWith(`${spotify.apiURL}/albums/?ids=0lw68yx3MhKflWFqCsGkIs,3Ad4QdO0EJr1c2livr9cmm`);
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ album: 'name' });
      const albums = spotify.album.getAlbums(['0lw68yx3MhKflWFqCsGkIs', '3Ad4QdO0EJr1c2livr9cmm']);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      spotify.album.getTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(fetchedStub).to.have.been
        .calledWith(`${spotify.apiURL}/albums/0lw68yx3MhKflWFqCsGkIs/tracks`);

      spotify.album.getTracks('3Ad4QdO0EJr1c2livr9cmm');
      expect(fetchedStub).to.have.been
        .calledWith(`${spotify.apiURL}/albums/3Ad4QdO0EJr1c2livr9cmm/tracks`);
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ track: 'track' });
      const albumsTracks = spotify.album.getTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(albumsTracks.resolveValue).to.be.eql({ track: 'track' });
    });
  });
});
