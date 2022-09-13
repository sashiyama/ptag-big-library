# frozen_string_literal: true

class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def overdue(user)
    @user = user
    mail(to: @user.email, subject: 'You need to return books that you are borrowing')
  end

  def book_available(book_available_notification_request)
    @request = book_available_notification_request
    mail(to: @request.user.email, subject: "#{@request.book.title} is available")
  end
end
