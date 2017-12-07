import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { API_URL } from '../src/config';
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Search', () => {
  let fetchedStub;
  let promise;
  let spotify;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      otken: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.be.a('function');
    });

    it('should exist the spotify.search.artist method', () => {
      expect(spotify.search.artist).to.be.a('function');
    });

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.be.a('function');
    });

    it('should exist the potify.search.playList method', () => {
      expect(spotify.search.playList).to.be.a('function');
    });
  });

  describe('spotify.search.artist ', () => {
    it('should call feth function', () => {
      spotify.search.artist('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should called fetch with the correct url', () => {
      spotify.search.artist('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Incubus&type=artist`);

      spotify.search.artist('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Muse&type=artist`);
    });
  });

  describe('spotify.search.albums', () => {
    it('should call feth function', () => {
      spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should called fetch with the correct url', () => {
      spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Incubus&type=album`);

      spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Muse&type=album`);
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call feth function', () => {
      spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should called fetch with the correct url', () => {
      spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Incubus&type=track`);

      spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Muse&type=track`);
    });
  });

  describe('spotify.search.playList', () => {
    it('should call feth function', () => {
      spotify.search.playList('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should called fetch with the correct url', () => {
      spotify.search.playList('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Incubus&type=playlist`);

      spotify.search.playList('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=Muse&type=playlist`);
    });
  });
});
