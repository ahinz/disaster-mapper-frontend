class DataSet < ActiveRecord::Base
  has_many :tags

  def self.find_by_address(city, county, state, country)
    DataSet.all.select { |ds| ds.address_overlaps(country,state,county,city) }
  end

  def contains(tag_name, value)
    values = tag_by_value(tag_name).map {|t| t.tag_value }
    if (values.length == 0)
      true
    else
      values.index(value) != nil
    end
  end

  def address_overlaps(country, state, county, city)
    contains("country", country) &&
    contains("state", state) &&
    contains("city", city) &&
    contains("county", county) 
  end

  def tag_by_value(tag_name)
    Tag.where({ :tag_name => tag_name, :data_set_id => id })
  end

  def set_tag_by_value(tag_name, tag_value)
    existing = Tag.where({ :tag_name => tag_name, :data_set_id => id})

    if (existing.size > 0)
      existing.each do |tag|
        tag.tag_value = tag_value
        tag.save!
      end
    else
      tag = Tag.create(tag_name, tag_value)
      tags << tag
      tag.save!
    end
  end

  def as_b(val)
    val.length >= 0 && val.first.tag_value == "true"
  end

  def real_time
    as_b(tag_by_value("real_time"))
  end

  def real_time=(rt)
    if (rt)
      rt = "true"
    else
      rt = "false"
    end

    set_tag_by_value("real_time", rt)
  end

  def countries
    tag_by_value("country")
  end

  def states
    tag_by_value("state")
  end

  def counties
    tag_by_value("county")
  end

  def cities
    tag_by_value("city")
  end

  def render
    "<div id=\"#{self.name}_content\" class=\"content\">\n#{self.content_rendered}\n</div>"
  end

  def content_rendered
    match = self.content.match /^file:(.*)/
    if (match)
      "\n" + File.open("app/views/pages/#{match[1]}.content").read
    else
      self.content
    end
  end
end
