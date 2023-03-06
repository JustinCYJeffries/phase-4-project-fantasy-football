class UsersController < ApplicationController
  before_action :require_login, except: [:new, :create]

  def new
    @user = User.new
  end
  

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      return :success
    else
      return :forbidden
    end
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to root_url, notice: 'Account updated!'
    else
      render :edit
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
