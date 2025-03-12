import { FormEvent, useReducer } from 'react';
import { useRouter } from 'next/navigation';

export interface FormState {
  username: string;
  password: string;
  showPassword: boolean;
  error: string;
  isLoading: boolean;
}

type Action =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string | boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'TOGGLE_PASSWORD' };

const initialState: FormState = {
  username: '',
  password: '',
  showPassword: false,
  error: '',
  isLoading: false,
};

export const reducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};

export const handleLogin = async (
  e: FormEvent<HTMLFormElement>,
  state: FormState,
  dispatch: React.Dispatch<Action>,
  router: ReturnType<typeof useRouter>
) => {
  e.preventDefault();
  dispatch({ type: 'SET_ERROR', error: '' });
  dispatch({ type: 'SET_LOADING', isLoading: true });

  // Simulated login process
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (state.username === 'user' && state.password === 'password') {
    router.push('/homepage');
  } else {
    dispatch({ type: 'SET_ERROR', error: 'Invalid username or password' });
  }

  dispatch({ type: 'SET_LOADING', isLoading: false });
};
