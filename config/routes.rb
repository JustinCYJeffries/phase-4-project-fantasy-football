Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :sessions, only: [:create, :destroy]
  resources :teams do 
    resources :players
    resources :player_teams, only: [:index, :create]
  end
  resources :players, only: [:index]
  resources :player_teams
  resources :sessions, only: [:create, :destroy]
end
