class AddTemplateToNewsletters < ActiveRecord::Migration
  def change
    add_column :newsletters, :template, :string
  end
end
