class Tag < ActiveRecord::Base
  belongs_to :data_set

  def self.create(name,value)
    t = Tag.new
    t.tag_name = name
    t.tag_value = value

    t
  end
end
