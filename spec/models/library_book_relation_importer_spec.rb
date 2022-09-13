# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Oneshots::LibraryBookRelationImporter do
  describe '#import!' do
    let(:importer) { described_class.new(Rails.root.join('doc', 'books2.csv')) }

    specify do
      expect { importer.import! }.to change { LibraryBookRelation.count }.by(633)
    end
  end
end
