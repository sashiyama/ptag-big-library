# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Oneshots::BookImporter do
  describe '#import!' do
    let(:importer) { described_class.new(Rails.root.join('doc', 'books1.csv')) }

    specify do
      importer.import!
      expect(Book.count).not_to eq 0
    end
  end
end
