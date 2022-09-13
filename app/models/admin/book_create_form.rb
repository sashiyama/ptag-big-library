# frozen_string_literal: true

module Admin
  class BookCreateForm
    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :library_id
    attribute :title
    attribute :author
    attribute :genre
    attribute :subgenre
    attribute :pages
    attribute :publisher
    attribute :copies

    validates :library_id, presence: true
    validates :title, presence: true
    validates :genre, presence: true
    validates :subgenre, presence: true
    validates :pages, presence: true
    validates :copies, presence: true

    def create!
      validate!

      book = Book.new(
        title: title,
        author: author,
        genre: genre,
        subgenre: subgenre,
        pages: pages,
        publisher: publisher,
        copies: copies
      )

      library.transaction do
        book.save!
        library.library_book_relations.create!(book: book)
      end
    end

    private

    def library
      @library ||= Library.find(library_id)
    end
  end
end
