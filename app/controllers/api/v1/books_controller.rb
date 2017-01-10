class Api::V1::BooksController < Api::V1::UsersController
respond_to :json
before_filter :restrict_access

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
        if book.update(book_params)
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

end
