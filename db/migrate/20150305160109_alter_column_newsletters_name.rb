class AlterColumnNewslettersName < ActiveRecord::Migration
  def self.up 
  	change_table :newsletters do |t|
  		t.change :name, :text
  end
end

	def self.down
		change_table :newsletters do |t|
			t.change :name, :string
		end
	end
end
