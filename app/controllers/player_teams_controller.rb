class PlayerTeamsController < ApplicationController
    rescue_from ActiveRecord::RecordNotUnique, with: :record_not_unique
    before_action :set_team
  def create
    @player_team = @team.player_teams.new(player_id: params[:player_id])

    if @player_team.save
      render json: @team.reload.players, status: :created
    else
      render json: @player_team.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @player_team = @team.player_teams.find_by(player_id: params[:id])
    @player_team.destroy
    head :no_content
  end

  private

  def set_team
    @team = current_user.teams.find(params[:team_id])
  end

  def player_team_params
    params.require(:player_id)
  end
  def record_not_unique
    render json: { error: 'Player is already on this team' }, status: :unprocessable_entity
  end
end
