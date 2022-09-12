# frozen_string_literal: true

module Admin
  class BooksController < Admin::BaseController
    def index
      @books = Book.order(updated_at: :desc).page(params[:page]).per(50)
    end

    def new; end

    def create; end

    def edit; end

    def update; end

    def destroy; end
  end
end
