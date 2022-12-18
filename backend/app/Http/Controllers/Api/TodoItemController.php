<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Resources\Api\TodoItemResource;
use App\Models\todoItem;
use Illuminate\Http\Request;

class TodoItemController extends Controller
{
    public function index()
    {
        return TodoItemResource::collection(todoItem::all());
    }

    public function show(TodoItem $todoItem)
    {
        return new TodoItemResource($todoItem);
    }

    public function store(StoreTodoRequest $request)
    {
        todoItem::create($request->validated());

        return response()->json("Todo Item Created");
    }

    public function update(StoreTodoRequest $request, todoItem $todoItem)
    {
        $todoItem->update($request->validated());

        return response()->json("Todo Item Updated");
    }

    public function destroy(todoItem $todoItem)
    {
        $todoItem->delete();

        return response()->json("Todo Item Deleted");
    }
}
