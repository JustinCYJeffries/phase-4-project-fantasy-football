class PlayersController < ApplicationController
  def index
    if params[:team_id]
      @players = Team.find(params[:team_id]).players
    elsif params[:term]
        @players = Player.all
        @players = @players.where("name LIKE ?", "%#{params[:term]}%") unless params[:term].blank?
        @players = @players.where(position: params[:position]) unless params[:position].blank?
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

  def create
    @player = Player.new(player_params)

    if @player.save
      render json: @player, status: :created
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

private

  def player_params
      params.require(:player).permit(:name, :position, :nflteam, team_id: [])
  end
end
  