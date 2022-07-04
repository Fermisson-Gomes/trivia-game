import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a tela de Login', () => {
  beforeEach(cleanup)
  it('Testes dos elementos da tela de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(/input-player-name/i);
    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    const playButton = screen.getByTestId(/btn-play/i);
    const settingsButton = screen.getByTestId(/btn-settings/i);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBeTruthy();
    expect(settingsButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('Testando botão Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId(/btn-settings/i);

    userEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings');
  });

  it('Teste do Botão Play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(/input-player-name/i);
    const email = screen.getByTestId(/input-gravatar-email/i);
    const playButton = screen.getByTestId(/btn-play/i);

    expect(playButton.disabled).toBeTruthy();

    userEvent.type(inputName, 'Rafael Rocha');
    userEvent.type(email, 'user@user.com');
    expect(playButton.disabled).toBeFalsy();

    userEvent.click(playButton)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    });
  });
});
