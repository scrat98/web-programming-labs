<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {

    $posts = DB::table('posts')->orderBy('id', 'DESC')->get();

    return view('post-list', [
        'posts' => $posts
    ]);
});

Route::post('api/1.0/posts/create', function (Request $request) {
    $title = $request->post('title');
    $text = $request->post('text');
    DB::table('posts')->insert([
        'title' => $title,
        'text' => $text
    ]);
    return redirect('/');
});

Route::get('api/1.0/posts/delete/{id}', function ($id) {
    DB::table('posts')->delete($id);
    return redirect('/');
});
