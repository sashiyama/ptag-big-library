# frozen_string_literal: true

class Manifest
  MANIFEST_URL = ENV['MANIFEST_URL'] || 'http://assets:8080'
  MANIFEST_FILE = 'manifest.json'
  private_constant :MANIFEST_URL, :MANIFEST_FILE

  class << self
    def body
      manifest = Manifest.new
      manifest.body
    end
  end

  def initialize
    @conn = Faraday.new(MANIFEST_URL) do |f|
      f.response :json
      f.response :raise_error
    end
  end

  def body
    @body ||= begin
                @conn.get(MANIFEST_FILE).body
              rescue Faraday::Error
                {}
              end
  end
end
