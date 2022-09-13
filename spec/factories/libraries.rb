# frozen_string_literal: true

FactoryBot.define do
  factory :library do
    branch_name { 'Downtown Branch' }
    address { '1068 Abdul Valleys Apt. 306' }
    phone_number { '6547481124' }
  end
end
