Rails.application.routes.draw do
  resources :users
  resources :teams
  
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get '/teams', to: 'teams#index'
  post '/users', to: 'users#create'
  post '/teams', to: 'teams#create'

 
  


end
