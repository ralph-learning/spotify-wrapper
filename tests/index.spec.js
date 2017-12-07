import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetc = require('node-fetch');

describe('SpotifyWrapper library', () => {
  it('should create  instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'http://spotify.com',
    });
    expect(spotify.apiURL).to.be.equals('http://spotify.com');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'sdasd4312ds1#!@$!@#',
    });
    expect(spotify.token).to.be.equal('sdasd4312ds1#!@$!@#');
  });

  describe('request method', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.be.exist;
    });

    it('should call fetch when request', () => {
      const spotify = new SpotifyWrapper({});
      spotify.request();

      expect(stubedFetch).to.been.have.calledOnce;
    });

    it('should call fetch with correct headers', () => {
      const spotify = new SpotifyWrapper({});
      spotify.request('https://spotify.com');

      expect(stubedFetch).to.been.have.calledWith('https://spotify.com');
    });

    it('should call fetch with correct URL', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      const header = {
        headers: {
          Authorization: 'Bearer foo',
        },
      };

      spotify.request('https://spotify.com');

      expect(stubedFetch).to.been.have.calledWith('https://spotify.com', header);
    });
  });
});
