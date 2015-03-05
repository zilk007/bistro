class AddCodeToNewsletters < ActiveRecord::Migration
  def change
    add_column :newsletters, :code, :text
  end
end
