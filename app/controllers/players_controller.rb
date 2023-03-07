class PlayersController < ApplicationController
    def index
      # Retrieve all players from the database
      @players = Player.all
  
      # If position query param is provided, filter by position
      if params[:position]
        @players = @players.where(position: params[:position])
      end
  
      render json: @players
    end
  
    def show
      # Find player by id
      @player = Player.find(params[:id])
  
      render json: @player
    end
  end
  