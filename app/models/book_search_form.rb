# frozen_string_literal: true

class BookSearchForm
  def initialize(books, keyword)
    @books = books
    @keyword = keyword
  end

  def result
    if @keyword
      @books.where('title ILIKE :keyword or author ILIKE :keyword or genre ILIKE :keyword or subgenre ILIKE :keyword', keyword: "%#{@keyword}%")
    else
      @books
    end
  end
end
