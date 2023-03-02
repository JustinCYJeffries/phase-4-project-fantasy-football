class SessionsController < ApplicationController
  def new_user
    @user = User.new
  end

  def create_user
    @user = User.new(user_params)

    if @user.save
      # If the user is saved successfully, create a new session for the user
      session[:user_id] = @user.id
      redirect_to root_url, notice: 'Account created!'
    else
      # If the user cannot be saved, show an error message
      render :new_user
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

  def create
    # Find the user in the database based on the username and password
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      # If the user exists and the password is correct, create a new session
      session[:user_id] = user.id
      redirect_to root_url, notice: 'Logged in!'
    else
      # If the user doesn't exist or the password is incorrect, show an error message
      flash.now.alert = 'Username or password is invalid'
      render :new
    end
  end

  def destroy
    # Destroy the session and log the user out
    session[:user_id] = nil
    redirect_to root_url, notice: 'Logged out!'
  end
end
