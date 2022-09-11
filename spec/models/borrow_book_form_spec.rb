# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BorrowBookForm do
  describe '#borrow!' do
    let(:user) { create(:user) }
    let(:book) { create(:book) }
    let(:form) { described_class.new(user, book.id) }

    specify do
      form.borrow!

      expect(user.checked_out_books.count).to eq 1
    end

    context 'Above lending limitation' do
      before do
        book.pages.times do
          create(:checked_out_book, book: book)
        end
      end

      specify do
        expect { form.borrow! }.to raise_error BorrowBookForm::LendingLimitError
      end
    end
  end
end
