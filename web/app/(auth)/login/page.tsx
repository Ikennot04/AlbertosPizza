'use client';

import { useReducer, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import "@/app/globals.css"
import { handleLogin, reducer, FormState } from './login';
import { MdRemoveRedEye } from "react-icons/md";

export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
    showPassword: false,
    error: '',
    isLoading: false,
  } as FormState);

  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 min-h-[400px] md:min-h-screen">
        <img
          src="/images/logo/Albertos.jpg"
          alt="Don Macchiatos Logo"
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
        <div className="max-w-md w-full mx-auto -mt-48">
          <h1 className="text-4xl font-bold mb-8 text-left text-[#edbd60] mt-4">LOGIN</h1>
          <form
            onSubmit={(e) => handleLogin(e, state, dispatch, router)}
            className="flex flex-col w-full space-y-6"
          >
            {state.error && <div className="text-red-600 text-sm text-center">{state.error}</div>}

            <div>
              <input
                id="username"
                type="text"
                value={state.username}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'username', value: e.target.value })
                }
                placeholder="Email"
                required
                className="w-full p-4 text-base border border-[#edbd60] rounded-[15px] outline-none focus:ring-2 focus:ring-[#edbd60]"
              />
            </div>

            <div className="relative">
              <input
                id="password"
                type={state.showPassword ? 'text' : 'password'}
                value={state.password}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })
                }
                placeholder="Password"
                required
                className="w-full p-4 text-base border border-[#edbd60] rounded-[15px] outline-none focus:ring-2 focus:ring-[#edbd60]"
              />
              <button
                type="button"
                onClick={() => dispatch({ type: 'TOGGLE_PASSWORD' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <MdRemoveRedEye size={24} />
              </button>
            </div>

            <button
              type="submit"
              disabled={state.isLoading}
              className={`${
                state.isLoading ? 'bg-gray-400' : 'bg-[#edbd60] hover:bg-[#d5aa4f]'
              } text-white p-4 text-base rounded-[15px] font-bold transition-all duration-200 ease-in-out shadow-lg`}
            >
              {state.isLoading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
