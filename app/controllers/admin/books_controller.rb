# frozen_string_literal: true

module Admin
  class BooksController < Admin::BaseController
    def index
      @books = Book.order(updated_at: :desc).page(params[:page]).per(50)
    end

    def new; end

    def create
      form = Admin::BookCreateForm.new(book_params)
      form.create!
      render json: { redirect_to: admin_books_path }, status: :created
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: [e.message] }, status: :bad_request
    rescue ArgumentError => e
      render json: { errors: [e.message] }, status: :bad_request
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: e.record.errors.full_messages }, status: :bad_request
    rescue ActiveModel::ValidationError => e
      render json: { errors: e.model.errors.full_messages }, status: :bad_request
    end

    def edit
      @book = Book.find(params[:id])
    end

    def update
      form = Admin::BookUpdateForm.new(book_params.merge(book_id: params[:id]))
      form.update!
      render json: { redirect_to: admin_books_path }, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: [e.message] }, status: :bad_request
    rescue ArgumentError => e
      render json: { errors: [e.message] }, status: :bad_request
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: e.record.errors.full_messages }, status: :bad_request
    rescue ActiveModel::ValidationError => e
      render json: { errors: e.model.errors.full_messages }, status: :bad_request
    end

    private

    def book_params
      params.permit(:library_id, :title, :author, :genre, :subgenre, :pages, :publisher, :copies)
    end
  end
end
