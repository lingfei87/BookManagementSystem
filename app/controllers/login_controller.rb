
class LoginController < ApplicationController
  def index
  end
  def register
    user = User.find_by email: params[:email]
    if user
      redirect_to '/users/sign_in'
    end
  end
end



