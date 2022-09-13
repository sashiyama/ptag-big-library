# frozen_string_literal: true

require 'csv'

module Oneshots
  class LibraryBookRelationImporter
    def initialize(path)
      @path = path
    end

    def import!
      delete_all

      Oneshots::LibraryInitializer.init!

      CSV.foreach(@path, **options) do |row|
        items = row.to_h.transform_keys(&:downcase)

        LibraryBookRelation.transaction do
          book = Book.create!(items.except('library'))
          library = Library.find_by!(branch_name: items['library'])
          LibraryBookRelation.create!(library: library, book: book)
        end
      end
    end

    private

    def delete_all
      LibraryBookRelation.delete_all
      Library.delete_all
      Book.delete_all
    end

    def options
      { headers: true, skip_blanks: true }
    end
  end
end
