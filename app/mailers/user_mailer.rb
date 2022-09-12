# frozen_string_literal: true

class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def overdue(user)
    @user = user
    mail(to: @user.email, subject: 'You need to return books that you are borrowing')
  end
end
