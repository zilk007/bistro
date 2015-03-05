class ChangeColumn < ActiveRecord::Migration
  def change
  	change_column :newsletters, :name, :text
  end
end
