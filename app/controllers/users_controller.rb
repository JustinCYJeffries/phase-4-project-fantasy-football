class UsersController < ApplicationController
  before_action :require_login, except: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render json: @user
    else
      return :forbidden
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
