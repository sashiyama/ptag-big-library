# frozen_string_literal: true

class SessionsController < ApplicationController
  def new; end

  def create
    user_session = UserSession.new(email: session_params[:email], password: session_params[:password])

    if user_session.current_user
      session[:user_id] = user_session.current_user.id
      render json: { redirect_to: root_path }, status: :created
    else
      render json: { error: 'Email and/or Password are invalid.' }, status: :bad_request
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private

  def session_params
    params.permit(:email, :password)
  end
end
