class DataSetController < ApplicationController
  def index
    @datasets = DataSet.all
  end

  def api
    @datasets = DataSet.all
  end

  def edit
  end

end
