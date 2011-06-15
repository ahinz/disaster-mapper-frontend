# This file is auto-generated from the current state of the database. Instead 
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your 
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110613043652) do

  create_table "data_sets", :force => true do |t|
    t.text     "name"
    t.text     "js"
    t.text     "header"
    t.text     "content"
    t.text     "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", :force => true do |t|
    t.integer  "data_set_id"
    t.text     "tag_name"
    t.text     "tag_value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end