# frozen_string_literal: true

class BaseController < ApplicationController
  before_action :require_login

  private

  def require_login
    return if current_user

    respond_to do |format|
      format.html { redirect_to new_sessions_path }
      format.json { render json: { redirect_to: new_sessions_path }, status: :bad_request }
    end
  end

  def current_user
    User.find_by(id: session[:user_id])
  end
end
