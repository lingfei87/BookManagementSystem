class Api::V1::UsersController < ApplicationController
  respond_to :json
  before_action :restrict_access , :except => [ :create]

  def index
    if check_admin == true
      respond_with User.all
    else
      render json: "Access Denied", status: 401
    end
  end

  def show
    user = User.find(params[:id])
    if check_admin == true || check_current_user(user.id) == true
      respond_with user
    else
      render json: "Access Denied", status: 401
    end
  end

  def create
    user = User.new(user_params)
      if user.save
        render json: user, status: 200
      else
        render json: {errors: user.errors}, status: 422
      end
  end

  def update
    user = User.find(params[:id])
    # Check Admin Authentication or Current User
    if check_admin == true || check_current_user(user.id) == true
      if user.update(user_params_update)
        render json: user, status: 200
      else
        render json: {errors: user.errors},status: 422
      end
    end
  end

  def destroy
    user = User.find(params[:id])
    # Check Admin Authentication or Current User
    if check_admin == true || check_current_user(user.id) == true
      ApiKey.delete_all(user_id: user.id)
      Book.delete_all(user_id:user.id)
      user.destroy
      render json: "User deleted", status: 204
    else
      render json: "Access denied", status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :role, :name)
  end

  private
  def user_params_update
    params.require(:user).permit(:email, :role, :name)
  end


  private
    # Post with token on header
    # def restrict_access
    # api_key = ApiKey.find_by_access_token(params[:access_token])
    # head unauthorized unless api_key
    # end
  def restrict_access
     authenticate_or_request_with_http_token do | token , options |
        ApiKey.exists?(access_token: token)
     end
  end

    # Check Admin Authentication
  def check_admin
    authenticate_or_request_with_http_token do | token , options |
      if (ApiKey.find_by access_token: token).role.eql? "admin"
        return true
      else
        return false
      end
    end
  end

  # Check current User
  def check_current_user (userID)
    authenticate_or_request_with_http_token do | token , options |
      if (ApiKey.find_by access_token: token).user_id.eql? userID
        return true
      else
        return false
      end
    end
  end
end
