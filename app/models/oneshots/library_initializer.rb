# frozen_string_literal: true

module Oneshots
  class LibraryInitializer
    class << self
      def init!
        seed = [
          { branch_name: 'Downtown Branch', address: '1068 Abdul Valleys Apt. 306', phone_number: '6547481124' },
          { branch_name: 'Neighbourhood Branch', address: '3152 Elenora Keys Apt. 558', phone_number: '9967486887' },
          { branch_name: 'Suburbs Branch', address: '4930 Guillermo Drive Apt. 389', phone_number: '6616369465' }
        ]
        Library.insert_all!(seed)
      end
    end
  end
end
