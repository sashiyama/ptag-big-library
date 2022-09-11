# frozen_string_literal: true

class ReturnedBook < ApplicationRecord
  belongs_to :checked_out_book

  validates :checked_out_book, presence: true
end
