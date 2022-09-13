# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::BookCreateForm do
  describe '#create!' do
    let(:library) { create(:library) }
    context 'when a record is INVALID' do
      context do
        let(:form) do
          described_class.new(
            library_id: library.id,
            title: 'Fundamentals of Wavelets',
            author: 'Goswami, Jaideva',
            genre: 'unknown',
            subgenre: 'signal_processing',
            pages: 228,
            publisher: 'Wiley',
            copies: 16
          )
        end

        specify do
          expect { form.create! }.to raise_error(ArgumentError)
        end
      end
      context do
        let(:form) do
          described_class.new(
            library_id: library.id,
            title: nil,
            author: 'Goswami, Jaideva',
            genre: 'tech',
            subgenre: 'signal_processing',
            pages: 228,
            publisher: 'Wiley',
            copies: 16
          )
        end

        specify do
          expect { form.create! }.to raise_error(ActiveModel::ValidationError)
        end
      end
    end

    context 'when a record is VALID' do
      let(:form) do
        described_class.new(
          library_id: library.id,
          title: 'Fundamentals of Wavelets',
          author: 'Goswami, Jaideva',
          genre: 'tech',
          subgenre: 'signal_processing',
          pages: 228,
          publisher: 'Wiley',
          copies: 16
        )
      end

      specify do
        expect { form.create! }.to change { Book.count }.by(1).and change { LibraryBookRelation.count }.by(1)
      end
    end
  end
end
