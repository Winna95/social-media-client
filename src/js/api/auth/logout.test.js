import { logout } from './logout';

describe('The logout feature', () => {
  it('clears the token from browser storage', () => {
    global.localStorage = {
      removeItem: jest.fn(),
    };

    logout();

    expect(global.localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
