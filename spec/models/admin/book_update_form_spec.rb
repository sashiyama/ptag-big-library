# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::BookUpdateForm do
  describe '#update!' do
    let(:library1) { create(:library) }
    let(:library2) { create(:library, branch_name: 'Neighbourhood Branch') }

    let(:relation) { create(:library_book_relation, library: library1) }

    context 'when a record is INVALID' do
      context do
        let(:form) do
          described_class.new(
            book_id: relation.book.id,
            library_id: library2.id,
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
          expect { form.update! }.to raise_error(ArgumentError)
        end
      end

      context do
        let(:form) do
          described_class.new(
            book_id: relation.book.id,
            library_id: library2.id,
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
          expect { form.update! }.to raise_error(ActiveModel::ValidationError)
        end
      end
    end

    context 'when a record is VALID' do
      let(:form) do
        described_class.new(
          book_id: relation.book.id,
          library_id: library2.id,
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
        expect { form.update! }.to change { relation.reload.library.id }.from(library1.id).to(library2.id)
      end
    end
  end
end
