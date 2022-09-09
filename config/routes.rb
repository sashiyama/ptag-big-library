# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'home#show'
  get :home, to: 'home#show', as: 'home'

  resources :users
  match '/signup', to: 'users#new', via: 'get'
end
