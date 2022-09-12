# frozen_string_literal: true

module Admin
  class BaseController < ApplicationController
    layout 'admin'
    before_action :require_librarian

    private

    def require_librarian
      return if current_librarian

      respond_to do |format|
        format.html { redirect_to new_admin_sessions_path }
        format.json { render json: { redirect_to: new_admin_sessions }, status: :bad_request }
      end
    end

    def current_librarian
      Librarian.find_by(id: session[:librarian_id])
    end
  end
end
