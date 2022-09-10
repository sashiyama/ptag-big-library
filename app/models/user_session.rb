# frozen_string_literal: true

class UserSession
  def initialize(email:, password:)
    @email = email
    @password = password
  end

  def current_user
    @current_user ||= (user if user&.authenticate(@password))
  end

  private

  def user
    @user ||= User.find_by(email: @email)
  end
end
