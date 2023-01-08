<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Resources\Api\TodoItemResource;
use App\Models\todoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $request->file('image')->storeAs('images', $request->file('image')->getClientOriginalName(), 'public');
            $validated['image'] = $request->file('image')->getClientOriginalName();
        }

        todoItem::create($validated);

        return response()->json("Todo Item Created");
    }

    public function update(StoreTodoRequest $request, todoItem $todoItem)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $request->file('image')->storeAs('images', $request->file('image')->getClientOriginalName(), 'public');
            $validated['image'] = $request->file('image')->getClientOriginalName();
        } else {
            $validated['image'] = $todoItem->image;
        }

        $todoItem->update($validated);

        return response()->json("Todo Item Updated");
    }

    public function destroy(todoItem $todoItem)
    {
        $todoItem->delete();

        return response()->json("Todo Item Deleted");
    }
}
