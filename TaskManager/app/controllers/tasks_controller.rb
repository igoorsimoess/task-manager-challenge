class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    begin
        render json: @task
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Task not found' } 
    end
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private


  def set_task
    begin
        @task = Task.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Task not found' }, status: :not_found
    end
  end

  def task_params
    params.require(:task).permit(:title, :description, :date, :category)
  end
end
