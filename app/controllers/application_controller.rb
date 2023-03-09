class ApplicationController < ActionController::API
    helper_method :current_user



    private

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def require_login
      return :forbidden unless current_user
    end
  end
