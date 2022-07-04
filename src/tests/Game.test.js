import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste da página Game', () => {
  jest.setTimeout(40000);
  it('Teste da Aplicação desde o Login até o Feedback', async () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(/input-player-name/i);
    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    const btnLogin = screen.getByTestId(/btn-play/i);

    userEvent.type(inputName, 'user');
    userEvent.type(inputEmail, 'user@user.com');
    userEvent.click(btnLogin);

    await screen.findByTestId("question-category");
    const trueBtn = await screen.findByTestId("correct-answer");
    userEvent.click(trueBtn);

    const buttonNext = await screen.findByTestId(/btn-next/i);
    userEvent.click(buttonNext);

    await screen.findByText('0', {}, {timeout:31000});
    await waitFor(() => expect(trueBtn).toBeDisabled(), {timeout:31000});

    userEvent.click(screen.getByTestId(/correct-answer/i));
    userEvent.click(screen.getByTestId(/btn-next/i)); 

    userEvent.click(screen.getByTestId(/correct-answer/i));
    userEvent.click(screen.getByTestId(/btn-next/i)); 

    userEvent.click(screen.getByTestId(/correct-answer/i));
    userEvent.click(screen.getByTestId(/btn-next/i));     

    userEvent.click(screen.getByTestId(/correct-answer/));
    userEvent.click(screen.getByTestId(/btn-next/i));
  });
  it('test if the token is wrong you get redirect to "/"', async () => {
    const tokenMock = {
      response_code: 3,
      results: [],
      };
    global.fetch = jest.fn(() => Promise.resolve(({
      json: () => Promise.resolve(tokenMock)
      })))
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'tryber@trybe.com');
    userEvent.click(btnPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});