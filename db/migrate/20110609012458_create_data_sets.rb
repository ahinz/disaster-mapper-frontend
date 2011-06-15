class CreateDataSets < ActiveRecord::Migration
  def self.up
    create_table :data_sets do |t|
	  t.text :name
      t.text :js
      t.text :header
      t.text :content
      t.text :url

      t.timestamps
    end
  end

  def self.down
    drop_table :data_sets
  end
end
