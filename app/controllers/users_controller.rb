class UsersController < ApplicationController
  before_action :require_login, except: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render json: @user
    else
      render plain: 'Field Must Be Filled Out' , status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
