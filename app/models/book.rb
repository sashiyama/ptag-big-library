# frozen_string_literal: true

class Book < ApplicationRecord
  GENRE = %w[fiction nonfiction philosophy science tech].freeze
  SUBGENRE = %w[anthology
                autobiography
                classic
                comic
                computer_science
                data_science
                economics
                education
                history
                legal
                mathematics
                misc
                novel
                objectivism
                philosophy
                physics
                poetry
                politics
                psychology
                science
                signal_processing
                trivia].freeze

  enum :genre, GENRE.zip(GENRE).to_h, prefix: true
  enum :subgenre, SUBGENRE.zip(SUBGENRE).to_h, prefix: true

  validates :title, presence: true
  validates :genre, presence: true
  validates :subgenre, presence: true
  validates :pages, presence: true
  validates :copies, presence: true

  has_many :checked_out_books, dependent: :destroy

  scope :on_loan, -> { joins(:checked_out_books).left_joins(checked_out_books: :returned_book).where(returned_book: { id: nil }).distinct }

  def borrowed?(user)
    checked_out_books.on_loan.where(user: user).exists?
  end

  def above_lending_limit?
    copies <= num_of_books_on_loan
  end

  def num_of_books_on_loan
    checked_out_books.on_loan.count
  end
end
