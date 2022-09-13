# frozen_string_literal: true

class Library < ApplicationRecord
  validates :branch_name, presence: true
  validates :address, presence: true
  validates :phone_number, presence: true, format: { with: /[0-9]+/ }

  has_many :library_book_relations
  has_many :books, through: :library_book_relations
end
