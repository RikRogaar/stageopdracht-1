<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//setup a route group for the api
Route::group([
    'namespace' => 'App\Http\Controllers\Api',
    ], function () {
    Route::apiResource('todo-items', TodoItemController::class);
});

// The apiResource route is a shortcut for the following routes:
// Route::get('todo-items', 'TodoItemController@index');
// Route::post('todo-items', 'TodoItemController@store');
// Route::get('todo-items/{todoItem}', 'TodoItemController@show');
// Route::put('todo-items/{todoItem}', 'TodoItemController@update');
// Route::delete('todo-items/{todoItem}', 'TodoItemController@destroy');