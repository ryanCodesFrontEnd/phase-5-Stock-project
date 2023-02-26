class Investor < ApplicationRecord
    has_many :portfolios, dependent: :destroy
    has_many :favorites
    has_many :stocks, through: :favorites
    # has_secure_password

    validates :email, :password, presence:true
end
