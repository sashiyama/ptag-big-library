# frozen_string_literal: true

class ReturnBookForm
  def initialize(user, book_id)
    @user = user
    @book_id = book_id
  end

  def return!
    checked_out_book.create_returned_book!

    notify_book_availability!
  end

  private

  def book
    @book ||= Book.find_by(id: @book_id)
  end

  def checked_out_book
    @checked_out_book ||= @user.checked_out_books.order(created_at: :desc).find_by(book: book)
  end

  def notify_book_availability!
    book.book_available_notification_requests.each do |request|
      UserMailer.book_available(request).deliver_now
    end
    book.book_available_notification_requests.delete_all
  end
end
