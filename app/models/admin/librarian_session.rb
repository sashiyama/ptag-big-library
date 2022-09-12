# frozen_string_literal: true

module Admin
  class LibrarianSession
    def initialize(email:, password:)
      @email = email
      @password = password
    end

    def current_librarian
      @current_librarian ||= librarian if librarian&.authenticate(@password)
    end

    private

    def librarian
      @librarian ||= Librarian.find_by(email: @email)
    end
  end
end
