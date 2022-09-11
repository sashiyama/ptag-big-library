# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'John' }
    sequence(:email) { |n| "test#{n}@example.test" }
    password { 'passw0rd!' }
  end
end
