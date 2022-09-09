# frozen_string_literal: true

require 'assets/asset_loader'

module ApplicationHelper
  def asset_url(filename)
    asset = AssetLoader.lookup(filename)

    return unless asset

    "#{ENV['ASSET_URL']}/#{asset}"
  end
end
