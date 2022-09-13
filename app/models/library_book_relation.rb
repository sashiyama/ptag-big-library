# frozen_string_literal: true

class LibraryBookRelation < ApplicationRecord
  belongs_to :library
  belongs_to :book

  validates :book_id, uniqueness: { scope: :library_id }
end
