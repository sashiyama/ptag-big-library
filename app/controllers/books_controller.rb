# frozen_string_literal: true

class BooksController < BaseController
  skip_before_action :require_login

  def show
    @book = Book.find(params[:id])
    @checked_out_books = @book.checked_out_books.includes(:returned_book, :user).order(created_at: :desc).page(params[:page]).per(50)
  end
end
