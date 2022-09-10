# frozen_string_literal: true

class HomeController < ApplicationController
  def show
    @books = Book.order(:title).page(params[:page]).per(51)
  end
end
