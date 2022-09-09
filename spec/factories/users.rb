# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'John' }
    email { 'john@example.test' }
    password { 'passw0rd!' }
  end
end
