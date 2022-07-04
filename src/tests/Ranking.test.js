import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const initialState = {
  player: {
    name: 'Rafael Rocha',
    gravatarEmail: 'user@user.com',
    score: 0,
    assertions: 3,
  },
};

describe('Testando a tela de Ranking', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify([
      { 
        name: 'Rafael Rocha',
        picture: 'https://www.gravatar.com/avatar/88b87698be0bc461f3cacf1f080929d5',
        score: 170,
      },
    ]));
  });

  it('Teste se os elementos do Ranking são renderizados', () => {
    renderWithRouterAndRedux(<App />, initialState, '/ranking');
    const profileImage = screen.getAllByAltText(/Rafael Rocha/i);
    expect(profileImage[0]).toBeInTheDocument();

    const playerName = screen.getAllByText(/Rafael Rocha/i);
    expect(playerName[0]).toBeInTheDocument();

    const score = screen.getAllByText(/170/i);
    expect(score[0]).toBeInTheDocument();
  });

  it('Teste se o Botão Redireciona para a tela de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');
    expect(history.location.pathname).toBe('/ranking'); 

    const playButton = screen.getByTestId(/btn-go-home/i);
    expect(playButton).toBeInTheDocument();

    userEvent.click(playButton);

    const playButtonLogin = screen.getByTestId(/btn-play/i);
    expect(playButtonLogin).toBeInTheDocument();

    const settingsButton = screen.getByTestId(/btn-settings/i);
    expect(settingsButton).toBeInTheDocument(); 
  });
});
