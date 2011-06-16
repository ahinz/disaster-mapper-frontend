require 'json'
require 'uri'

$geocode_cache ||= Hash.new

class PagesController < ApplicationController
  def home
  end


  def datasets
    @datasets ||= DataSet.all
  end

  def report
    # Grab and geocode address
    @extra_scripts = '<script src="/pages/script?address=' + params[:address] + '" type="text/javascript"></script>' +
      ' <script type="text/javascript" src="/javascripts/main.js"></script>'

    coded = geocode(params[:address])
    @content = DataSet.find_by_address(*create_address_array(coded["results"].first()["address_components"])[2..-1])

  end

  def geocode(addr)
    addr = URI.escape(addr)
    if ($geocode_cache[addr] == nil)
      puts "-- Address Cache Miss --"
      rslt = JSON.parse(Net::HTTP.get(URI.parse("http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=#{addr}")))
      $geocode_cache[addr] = rslt
    else
      puts "-- Cache Hit! --"
    end

    $geocode_cache[addr]
  end

  def script
    latlng = geocode(params[:address])["results"].first()["geometry"]["location"]
    lat = latlng["lat"]
    lon = latlng["lng"]
    
    coded = geocode(params[:address])
    datasets = DataSet.find_by_address(*create_address_array(coded["results"].first()["address_components"])[2..-1])

    script_name = params[:script]
    render :text =>
      render_js(datasets.inject(create_js_context(datasets,lat,lon)) { |ctxt, dataset| append_js(ctxt,dataset.js) })
  end


  # Need to move this to a helper
  def get_type(addr_results, type)
    addr_results.select { |comp| comp["types"].index(type) != nil }.map { |comp| comp["long_name"] }.first
  end 

  def create_address_array(addr_comps)
    ["street_number","route","locality","administrative_area_level_2","administrative_area_level_1", "country"].map { |key| get_type(addr_comps, key).downcase }
  end

  def create_js_context(datasets, lat, lon)
    create_body = datasets.map do |dataset|
      "build_content_div(\"#{dataset.name}_content\", \"#{dataset.header}\", \"#{dataset.name}_map\",\"#{dataset.url}\");"
    end.join("\n")

    "function create_latlng() {\n return new google.maps.LatLng(#{lat},#{lon});\n}\n" +
      "function create_content() {\n#{create_body}\n}\n" +
      "\n$(function() {\n"
  end

  def append_js(jscontext, page)
    if (page.match /^file\:/)
      append_js_file(jscontext, page.split(":")[1])
    else
      jscontext += "\n" + page
    end
  end

  def append_js_file(jscontext, page)                
      jscontext += "\n" + File.open("app/views/pages/#{page}.js").read
  end

  def render_js(jscontext)
    jscontext + "\n});"
  end

end
