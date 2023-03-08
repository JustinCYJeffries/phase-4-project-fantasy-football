Rails.application.routes.draw do
  resources :users
  resources :teams do
    resources :players
    resources :player_teams, only: [:index, :create]
  end
  resources :players, only: [:index]
  resources :player_teams

  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  post '/users', to: 'users#create'
  post '/teams', to: 'teams#create'
end
