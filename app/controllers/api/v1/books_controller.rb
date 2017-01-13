class Api::V1::BooksController < ApplicationController
respond_to :json
before_action :restrict_access

  def index
    respond_with Book.all
  end

  def show
    respond_with Book.find(params[:id])
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: 201
    else
      render json: {errors: book.errors}, status: 422
    end
  end

  def update
    book = Book.find(params[:id])
    #check admin or current user
    if check_admin == true || check_current_user(book.user_id)
        if book.update(book_params_update)
          render json: book, status: 200
        else
          render json: {errors: book.errors},status: 422
        end
    else
      render json: "Access denied", status: 401
    end
  end

  def destroy
    book = Book.find(params[:id])
    if check_admin == true || check_current_user(book.user_id)
      book.destroy
      head 204
    else
      render json: "Access denied", status: 401
    end
  end

  private
  def book_params
    params.require(:book).permit(:user_id, :title, :description)
  end

  private
  def book_params_update
    params.require(:book).permit(:title, :description)
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
  private
  def restrict_access
    authenticate_or_request_with_http_token do | token , options |
      ApiKey.exists?(access_token: token)
    end
  end
end
