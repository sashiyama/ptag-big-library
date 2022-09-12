# frozen_string_literal: true

module Admin
  class LibrariansController < Admin::BaseController
    skip_before_action :require_librarian

    def new; end

    def create
      librarian = Librarian.new(librarian_params)

      if librarian.save
        session[:librarian_id] = librarian.id
        render json: { redirect_to: admin_books_path }, status: :created
      else
        render json: { errors: librarian.errors.full_messages }, status: :bad_request
      end
    end

    private

    def librarian_params
      params.permit(:name, :email, :password)
    end
  end
end
