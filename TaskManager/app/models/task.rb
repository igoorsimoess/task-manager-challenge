class Task < ApplicationRecord
# in order to do some validations
  validates :title, presence: true
  validates :description, presence: true
  validates :date, presence: true
  validates :category, presence: true

  belongs_to :user
end
