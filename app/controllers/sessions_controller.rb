class SessionsController < ApplicationController

  
  def create
    # Find the user in the database based on the username and password
    user = User.find_by(username: params[:username][:username])

    if user && user.authenticate(params[:username][:password])
      # If the user exists and the password is correct, create a new session
      session[:user_id] = user.id
      render json: user
    else
      # If the user doesn't exist or the password is incorrect, show an error message
      render json: { error: "Not authorized" }, status: :unauthorized
      
    end
  end



  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

  
  def destroy
    # Destroy the session and log the user out
    session[:user_id] = nil
    redirect_to root_url, notice: 'Logged out!'
  end
end
