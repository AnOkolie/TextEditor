import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" class="space-y-6">
        <div>
          <label for="username" class="block text-sm/6 font-medium text-gray-100">Username</label>
          <div class="mt-2">
            <input
              id="username"
              type="text"
              name="username"
              required
              autocomplete="username"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email</label>
          <div class="mt-2">
            <input
              id="email"
              type="email"
              name="email"
              required
              autocomplete="email"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
            <div class="text-sm"></div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              type="password"
              name="password"
              required
              autocomplete="current-password"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
          <div class="flex items-center justify-between">
            <label for="confirm-password" class="block text-sm/6 font-medium text-gray-100"
              >Confirm Password</label
            >
            <div class="text-sm"></div>
          </div>
          <div class="mt-2">
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              required
              autocomplete="current-password"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Have an account?
        <a href="login" class="font-semibold text-indigo-400 hover:text-indigo-300"
          >Sign in to your account</a
        >
      </p>
    </div>
  </div>`,
})
export class Signup {}
