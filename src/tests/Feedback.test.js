import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

const initialStateNoError = {
  player: {
    name: 'Rafael Rocha',
    gravatarEmail: 'user@user.com',
    score: 0,
    assertions: 3,
  },
};

const initialStateError = {
  player: {
    name: 'Rafael Rocha',
    gravatarEmail: 'user@user.com',
    score: 0,
    assertions: 1,
  },
};

describe('Teste da página de Feedback', () => {
  it('Teste se os elementos são renderizados', async () => {
    renderWithRouterAndRedux(<Feedback />);

    const headerImage = await screen.findByAltText(/imagem de perfil/i);
    await expect(headerImage).toBeInTheDocument();

    const playerName = await screen.findByTestId(/header-player-name/i);
    expect(playerName).toBeInTheDocument();

    const score = screen.getByTestId(/feedback-total-score/i);
    expect(score).toBeInTheDocument();

    const question = screen.getByTestId(/feedback-total-question/i);
    expect(question).toBeInTheDocument();
  });

  it('Renderiza "Could be better..." quando acerta menos de três perguntas', () => {
    renderWithRouterAndRedux(<App />, initialStateError, '/feedback');
    const messageFeedback = screen.getByText(/could be better\.\.\./i);
    expect(messageFeedback).toBeInTheDocument();
  });

  it('Renderiza "Well Done" quando acerta menos de três perguntas', async () => {
    renderWithRouterAndRedux(<App />, initialStateNoError, '/feedback');
    const messageFeedback = screen.getByText(/well done!/i);
    expect(messageFeedback).toBeInTheDocument();
  });

  it('Verifica se o botão Play Again renderiza', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialStateNoError, '/feedback');
    expect(history.location.pathname).toBe('/feedback');

    const playButtonLogin = screen.getByTestId(/btn-play-again/i);

    expect(playButtonLogin).toBeInTheDocument(); 
    expect(playButtonLogin).not.toBeDisabled();

    userEvent.click(playButtonLogin);

    expect(history.location.pathname).toBe('/'); 
  });

  it('Verifica se o botão Ranking renderiza', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialStateNoError, '/feedback');

    const rankingButton = screen.getByTestId(/btn-ranking/i);

    expect(rankingButton).toBeInTheDocument();
    expect(rankingButton).not.toBeDisabled();

    userEvent.click(rankingButton);

    expect(history.location.pathname).toBe('/ranking');

    const playButton = screen.getByTestId(/btn-go-home/i);

    expect(playButton).toBeInTheDocument();
  });
});