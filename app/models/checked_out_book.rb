# frozen_string_literal: true

class CheckedOutBook < ApplicationRecord
  belongs_to :user
  belongs_to :book

  has_one :returned_book, dependent: :destroy

  validates :user, presence: true
  validates :book, presence: true
  validates :book, uniqueness: { scope: :user }
end
