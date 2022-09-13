# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Oneshots::LibraryInitializer do
  describe '.init!' do
    specify do
      expect { described_class.init! }.to change { Library.count }.by(3)
    end
  end
end
