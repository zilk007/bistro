class Customer < ActiveRecord::Base
belongs_to :user
validates_email_format_of :email, :message => 'is not looking good'

end
