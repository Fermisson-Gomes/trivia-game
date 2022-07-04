import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste da página Game', () => {
  jest.setTimeout(60000);
  it('Teste da Aplicação desde o Login até o Feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(/input-player-name/i);
    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    const btnLogin = screen.getByTestId(/btn-play/i);

    userEvent.type(inputName, 'user');
    userEvent.type(inputEmail, 'user@user.com');
    userEvent.click(btnLogin);

    await waitFor( async () => {
      await screen.findByTestId(/question-category/i);
    });
    const trueBtn = await screen.findByTestId(/correct-answer/i);
    userEvent.click(trueBtn);

    const buttonNext = await screen.findByTestId(/btn-next/i);
    userEvent.click(buttonNext);

    await screen.findByText('0', {}, {timeout:31000});
    await waitFor(() => expect(trueBtn).toBeDisabled());

    userEvent.click(await screen.findByTestId(/btn-next/i)); 

    userEvent.click(await screen.findByTestId(/btn-next/i));

    userEvent.click(await screen.findByTestId(/btn-next/i));     

    userEvent.click(await screen.findByTestId(/btn-next/i));

    await waitFor(() => expect(history.location.pathname).toBe('/feedback'));
  });
  it('Teste se o token inválido é apagado e redirecionado', async () => {
    const tokenMock = {
      response_code: 3,
      results: [],
      };
    global.fetch = jest.fn(() => Promise.resolve(({
      json: () => Promise.resolve(tokenMock)
      })))
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(/input-player-name/i);
    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.type(inputName, 'user');
    userEvent.type(inputEmail, 'user@user.com');
    userEvent.click(playButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});