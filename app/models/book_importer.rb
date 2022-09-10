# frozen_string_literal: true

require 'csv'

class BookImporter
  def initialize(path)
    @path = path
  end

  def import!
    Book.delete_all

    books = Set.new
    CSV.foreach(@path, **options) do |row|
      books.add(row.to_h.transform_keys(&:downcase))
    end
    Book.insert_all!(books.to_a)
  end

  private

  def options
    { headers: true, skip_blanks: true }
  end
end
