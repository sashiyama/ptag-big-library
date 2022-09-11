# frozen_string_literal: true

FactoryBot.define do
  factory :book do
    title { 'Fundamentals of Wavelets' }
    author { 'Goswami, Jaideva' }
    genre { 'tech' }
    subgenre { 'signal_processing' }
    pages { 228 }
    publisher { 'Wiley' }
    copies { 16 }
  end
end
