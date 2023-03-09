Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :sessions, only: [:create, :destroy]
  resources :teams
  resources :players, only: [:index]
  resources :player_teams
  resources :sessions, only: [:create, :destroy]
end
