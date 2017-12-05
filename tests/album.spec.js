import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';
import { API_URL } from '../src/config';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Album', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      getAlbum();
      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('should call fetch with correct url', () => {
      getAlbum('0lw68yx3MhKflWFqCsGkIs');
      expect(fetchedStub).to.been.have
        .calledWith(`${API_URL}/albums/0lw68yx3MhKflWFqCsGkIs`);

      getAlbum('3Ad4QdO0EJr1c2livr9cmm');
      expect(fetchedStub).to.been.have
        .calledWith(`${API_URL}/albums/3Ad4QdO0EJr1c2livr9cmm`);
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'Album' });
      const album = getAlbum('0lw68yx3MhKflWFqCsGkIs');

      expect(album.resolveValue).to.be.eql({ body: 'Album' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      getAlbums(['0lw68yx3MhKflWFqCsGkIs', '3Ad4QdO0EJr1c2livr9cmm']);
      expect(fetchedStub).to.been.have
        .calledWith(`${API_URL}/albums/?ids=0lw68yx3MhKflWFqCsGkIs,3Ad4QdO0EJr1c2livr9cmm`);
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums(['0lw68yx3MhKflWFqCsGkIs', '3Ad4QdO0EJr1c2livr9cmm']);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      getAlbumTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/albums/0lw68yx3MhKflWFqCsGkIs/tracks`);

      getAlbumTracks('3Ad4QdO0EJr1c2livr9cmm');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/albums/3Ad4QdO0EJr1c2livr9cmm/tracks`);
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ track: 'track' });
      const albumsTracks = getAlbumTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(albumsTracks.resolveValue).to.be.eql({ track: 'track' });
    });
  });
});
