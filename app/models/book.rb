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
end
