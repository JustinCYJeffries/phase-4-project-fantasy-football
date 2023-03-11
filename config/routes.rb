Rails.application.routes.draw do
  resources :users, only: [:create]
  resource :sessions, only: [:create, :destroy]
  resources :teams do
    resources :players
    resources :player_teams, only: [:index, :create, :destroy, :update]
  end
  resources :players, only: [:index, :create]

  

end
