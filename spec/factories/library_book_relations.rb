# frozen_string_literal: true

FactoryBot.define do
  factory :library_book_relation do
    library
    book
  end
end
