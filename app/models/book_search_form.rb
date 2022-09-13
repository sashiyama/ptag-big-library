# frozen_string_literal: true

class BookSearchForm
  def initialize(books, keyword)
    @books = books
    @keyword = keyword
  end

  def result
    if @keyword
      @books.joins(library_book_relation: :library).where(<<~SQL, keyword: "%#{@keyword}%")
        title ILIKE :keyword or
        author ILIKE :keyword or
        genre ILIKE :keyword or
        subgenre ILIKE :keyword or
        libraries.branch_name ILIKE :keyword
      SQL
    else
      @books
    end
  end
end
