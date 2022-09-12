# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'home#show'
  get :home, to: 'home#show', as: 'home'

  resources :users, only: %i[new create]
  resource :sessions, only: %i[new create destroy]
  match '/signup', to: 'users#new', via: 'get'

  resources :checked_out_books, only: :create
  resources :returned_books, only: :create

  resource :mypage, only: :show

  resources :books, only: :show

  namespace :admin do
    resources :librarians, only: %i[new create]
    resource :sessions, only: %i[new create destroy]
    resources :books
  end
end
