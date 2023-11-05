import { login } from './login';

describe('The login', () => {
  it('fetches and stores a token in browser storage', async () => {
    const epost = 'kari@noroff.no';
    const password = 'Karikari123.';

    const profile = {
      accessToken: 'this is a token',
    };
    const response = {
      ok: true,
      json: jest.fn().mockResolvedValue(profile),
    };
    global.fetch = jest.fn().mockResolvedValue(response);

    global.localStorage = {
      setItem: jest.fn(),
    };

    await login(epost, password);

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify('this is a token'),
    );
  });
});
