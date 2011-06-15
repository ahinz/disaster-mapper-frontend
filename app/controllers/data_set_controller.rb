class DataSetController < ApplicationController
  def index
    @datasets = DataSet.all
  end

  def edit
  end

end
