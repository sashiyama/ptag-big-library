# frozen_string_literal: true

module Admin
  class BooksController < Admin::BaseController
    def index
      @books = Book.order(updated_at: :desc).page(params[:page]).per(50)
    end

    def new; end

    def create
      book = Book.new(book_params)

      if book.save
        render json: { redirect_to: admin_books_path }, status: :created
      else
        render json: { errors: book.errors.full_messages }, status: :bad_request
      end
    end

    def edit
      @book = Book.find(params[:id])
    end

    def update
      book = Book.find(params[:id])

      if book.update(book_params)
        render json: { redirect_to: admin_books_path }, status: :ok
      else
        render json: { errors: book.errors.full_messages }, status: :bad_request
      end
    end

    def destroy
      book = Book.find(params[:id])
      book.destroy
      render json: { redirect_to: admin_books_path }, status: :ok
    end

    private

    def book_params
      params.permit(:title, :author, :genre, :subgenre, :pages, :publisher, :copies)
    end
  end
end
