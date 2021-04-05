class Image < ApplicationRecord
  belongs_to :user
  has_one_attached :file

  validates :file, attached: true, size: {less_than: 5.megabytes, message: "should be less than 5MB"}

end
