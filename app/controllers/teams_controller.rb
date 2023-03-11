class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :update, :destroy]

  def index
    @teams = current_user.teams.all
    render json: @teams
  end

  def show
    render json: @team
  end

  def create
    @team = current_user.teams.new(team_params)

    if @team.save
      render json: @team, status: :created, location: @team
    else
      render plain: 'Field Must Be Filled Out' , status: :unprocessable_entity
    end
  end

  def update
    if @team.update(team_params)
      render json: @team
    else
      render plain: 'Field Must Be Filled Out' , status: :unprocessable_entity
    end
  end

  def destroy
    @team.destroy
    head :no_content
  end

  private

  def set_team
    @team = current_user.teams.find(params[:id])
  end

  def team_params
    params.require(:team).permit(:name, :user_id)
  end
end
