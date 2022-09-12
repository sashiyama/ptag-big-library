# frozen_string_literal: true

module Admin
  class SessionsController < Admin::BaseController
    skip_before_action :require_librarian

    def new; end

    def create
      librarian_session = LibrarianSession.new(email: session_params[:email], password: session_params[:password])

      if librarian_session.current_librarian
        session[:librarian_id] = librarian_session.current_librarian.id
        render json: { redirect_to: admin_books_path }, status: :created
      else
        render json: { error: 'Email and/or Password are invalid.' }, status: :bad_request
      end
    end

    def destroy
      session[:librarian_id] = nil
      redirect_to action: :new
    end

    private

    def session_params
      params.permit(:email, :password)
    end
  end
end
