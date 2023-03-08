class PlayersController < ApplicationController
    def index
        if params[:team_id]
          @players = Team.find(params[:team_id]).players
        elsif params[:search]
          @players = Player.where("name LIKE ?", "%#{params[:search]}%")
        else
          @players = Player.all
        end
      
        render json: @players
      end
      
  
    def show
      # Find player by id
      @player = Player.find(params[:id])
  
      render json: @player
    end

private

def player_params
    params.require(:cleaner).permit(team_id: [])
end

  end
  