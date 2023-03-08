class PlayerTeamsController < ApplicationController
    def index
      @player_teams = PlayerTeam.all
      render json: @player_teams, status: :ok
    end
  
    def create
      @player_team = PlayerTeam.new(player_team_params)
  
      if @player_team.save
        render json: @player_team, status: :created
      else
        render json: @player_team.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @player_team = PlayerTeam.find(params[:id])
      @player_team.destroy
      head :no_content
    end
  
    private
  
    def player_team_params
      params.require(:player_team).permit(:player_id, :team_id)
    end
  end
  