#class RedactorRails::Asset < ActiveRecord::Base
 # include RedactorRails::Orm::ActiveRecord::AssetBase
 # delegate :url, :current_path, :size, :content_type, :filename, :to => :data
 # validates_presence_of :data
#end


require 'redactor-rails/orm/base'

class RedactorRails::Asset < ActiveRecord::Base
  include RedactorRails::Orm::Base::AssetBase::InstanceMethods

  self.table_name = 'redactor_assets'

  belongs_to :assetable, :polymorphic => true

  delegate :url, :current_path, :size, :content_type, :filename, :to => :data
  validates_presence_of :data
end