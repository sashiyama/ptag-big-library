# frozen_string_literal: true

class ReturnBookForm
  def initialize(user, book_id)
    @user = user
    @book_id = book_id
  end

  def return!
    checked_out_book.create_returned_book!
  end

  private

  def book
    @book ||= Book.find_by(id: @book_id)
  end

  def checked_out_book
    @checked_out_book ||= @user.checked_out_books.find_by(book: book)
  end
end
