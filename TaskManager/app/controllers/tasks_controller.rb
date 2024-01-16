class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    tasks = Rails.cache.fetch("user_#{current_user.id}_tasks", expires_in: 1.hour) do
      tasks_from_db = current_user.tasks.to_a
      puts "Not using cached content for user #{current_user.id} tasks."
      render json: tasks_from_db
    end

    puts "Using cached content for user #{current_user.id} tasks."

    render json: tasks
  end

  def show
    begin
      render json: @task
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Task not found' } 
    end
  end

  def create
    @task = current_user.tasks.build(task_params)
    if @task.save
      render json: @task, status: :created
      update_tasks_cache(@task)
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
      update_tasks_cache(@task)
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    remove_task_from_cache(@task)
    head :no_content
  end
  private

  def update_tasks_cache(task)
    tasks_from_cache = Rails.cache.fetch('tasks', expires_in: 1.hour) { [] }

    index = tasks_from_cache.index { |cached_task| cached_task.id == task.id }

    if index
      tasks_from_cache[index] = task
    else
      tasks_from_cache.push(task)
    end

    Rails.cache.write('tasks', tasks_from_cache, expires_in: 1.hour)
  end

  def remove_task_from_cache(task)
    tasks_from_cache = Rails.cache.fetch("user_#{current_user.id}_tasks", expires_in: 1.hour) { [] }

    tasks_from_cache.reject! { |cached_task| cached_task.id == task.id }

    Rails.cache.write("user_#{current_user.id}_tasks", tasks_from_cache, expires_in: 1.hour)
  end

  def set_task
    begin
      @task = current_user.tasks.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Task not found' }, status: :not_found
    end
  end

  def task_params
    params.require(:task).permit(:title, :description, :date, :category)
  end
end
