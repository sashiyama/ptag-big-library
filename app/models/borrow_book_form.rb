# frozen_string_literal: true

class BorrowBookForm
  class LendingLimitError < ApplicationError; end

  def initialize(user, book_id)
    @user = user
    @book_id = book_id
  end

  def borrow!
    raise LendingLimitError if book.copies <= book.num_of_books_on_loan

    @user.checked_out_books.create!(book: book)
  end

  private

  def book
    @book ||= Book.find_by(id: @book_id)
  end
end
