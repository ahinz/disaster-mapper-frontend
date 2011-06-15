class AddTagsTable < ActiveRecord::Migration
  def self.up
    create_table :tags do |t|
      t.integer :data_set_id
      t.text :tag_name
      t.text :tag_value

      t.timestamps
    end
  end

  def self.down
    drop_table :tags
  end
end
