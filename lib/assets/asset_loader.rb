# frozen_string_literal: true

require 'assets/manifest'

class AssetLoader
  class << self
    def lookup(name)
      loader = AssetLoader.new
      loader.lookup(name)
    end
  end

  def initialize
    @manifest = Manifest.body
  end

  def lookup(name)
    @manifest.fetch(name, nil)
  end
end
