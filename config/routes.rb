Rails.application.routes.draw do
  resources :users
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get '/teams', to: 'teams#index'
  post '/users', to: 'users#create'

  post '/teams' do
    content_type :json
  
    # parse the request body to get the team name
    request.body.rewind
    team_name = JSON.parse(request.body.read)['name']
  
    # create a new team and return its data
    team = Team.create(name: team_name, user_id: session[:user_id])
    team.to_json
  end
  
  # get all teams for the current user
  get '/teams' do
    content_type :json
  
    # get all teams for the current user and return their data
    teams = Team.where(user_id: session[:user_id])
    teams.to_json
  end

end
