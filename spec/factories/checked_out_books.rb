# frozen_string_literal: true

FactoryBot.define do
  factory :checked_out_book do
    user
    book
    created_at { Time.now }
  end
end
