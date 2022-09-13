# frozen_string_literal: true

module Admin
  class BookUpdateForm
    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :book_id
    attribute :library_id
    attribute :title
    attribute :author
    attribute :genre
    attribute :subgenre
    attribute :pages
    attribute :publisher
    attribute :copies

    validates :book_id, presence: true
    validates :library_id, presence: true
    validates :title, presence: true
    validates :genre, presence: true
    validates :subgenre, presence: true
    validates :pages, presence: true
    validates :copies, presence: true

    def update!
      validate!

      library.transaction do
        book.library_book_relation.update!(library: library)
        book.update!(
          title: title,
          author: author,
          genre: genre,
          subgenre: subgenre,
          pages: pages,
          publisher: publisher,
          copies: copies
        )
      end
    end

    private

    def book
      @book ||= Book.find(book_id)
    end

    def library
      @library ||= Library.find(library_id)
    end
  end
end
