class Newsletter < ActiveRecord::Base
	belongs_to :user

	validates :user_id, presence: true
	validates :code, presence: true


end
