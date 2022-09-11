# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: true
  validates :password, length: { minimum: 6 }

  has_many :checked_out_books, dependent: :destroy
  has_many :books, through: :checked_out_books
end
